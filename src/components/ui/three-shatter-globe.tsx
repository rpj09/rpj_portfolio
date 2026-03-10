'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeShatterGlobeProps {
    color?: string;
    particleCount?: number;
    radius?: number;
}

export default function ThreeShatterGlobe({
    color = '#4a90e2',
    particleCount = 5000,
    radius = 5,
}: ThreeShatterGlobeProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 100);
        camera.position.z = 15;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);

        // Generate Particles on a Sphere
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const originalPositions = new Float32Array(particleCount * 3);
        const randoms = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            // Fibonacci sphere distribution for even spread
            const phi = Math.acos(1 - 2 * (i + 0.5) / particleCount);
            const theta = Math.PI * (1 + Math.sqrt(5)) * i;

            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            originalPositions[i * 3] = x;
            originalPositions[i * 3 + 1] = y;
            originalPositions[i * 3 + 2] = z;

            // Random direction vectors for the shatter effect
            const randVector = new THREE.Vector3(
                Math.random() - 0.5,
                Math.random() - 0.5,
                Math.random() - 0.5
            ).normalize().multiplyScalar(Math.random() * 2 + 1);

            randoms[i * 3] = randVector.x;
            randoms[i * 3 + 1] = randVector.y;
            randoms[i * 3 + 2] = randVector.z;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('aOriginalPosition', new THREE.BufferAttribute(originalPositions, 3));
        geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 3));

        // Custom Shader Material for performance and visual control
        const customShaderMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uColor: { value: new THREE.Color(color) },
                uMouse: { value: new THREE.Vector3(999, 999, 999) },
                uTime: { value: 0 },
                uRadius: { value: 3.5 }, // Action radius of the mouse
                uForce: { value: 4.0 }, // Push strength
            },
            vertexShader: `
                uniform vec3 uMouse;
                uniform float uTime;
                uniform float uRadius;
                uniform float uForce;
                
                attribute vec3 aOriginalPosition;
                attribute vec3 aRandom;
                
                varying float vDistance;
                
                void main() {
                    // Global rotation
                    float rotY = uTime * 0.1;
                    mat3 rotMat = mat3(
                        cos(rotY), 0.0, sin(rotY),
                        0.0, 1.0, 0.0,
                        -sin(rotY), 0.0, cos(rotY)
                    );
                    
                    vec3 rotatedOrig = rotMat * aOriginalPosition;
                    
                    // Mouse repulsion logic
                    float dist = distance(rotatedOrig, uMouse);
                    vec3 targetPos = rotatedOrig;
                    
                    if (dist < uRadius) {
                        // Calculate force based on proximity
                        float force = (1.0 - (dist / uRadius)) * uForce;
                        vec3 dir = normalize(rotatedOrig - uMouse);
                        
                        // Push outward and add random scatter
                        targetPos += dir * force + (aRandom * force * 0.5);
                    }
                    
                    // Pass distance to fragment for coloring/alpha
                    vDistance = dist;
                    
                    vec4 mvPosition = modelViewMatrix * vec4(targetPos, 1.0);
                    // Point size perspective
                    gl_PointSize = (15.0 / -mvPosition.z); 
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                uniform vec3 uColor;
                uniform float uRadius;
                varying float vDistance;
                
                void main() {
                    // Make particles circular
                    float distToCenter = distance(gl_PointCoord, vec2(0.5));
                    if (distToCenter > 0.5) discard;
                    
                    // Base color
                    vec3 finalColor = uColor;
                    float alpha = 0.8;
                    
                    // Highlight particles that are being pushed
                    if (vDistance < uRadius) {
                        float intensity = 1.0 - (vDistance / uRadius);
                        finalColor = mix(uColor, vec3(1.0, 1.0, 1.0), intensity * 0.8);
                        alpha = 1.0;
                    }
                    
                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        const points = new THREE.Points(geometry, customShaderMaterial);
        scene.add(points);

        // Raycaster for mouse interaction
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2(-999, -999);
        const hitPlane = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100),
            new THREE.MeshBasicMaterial({ visible: false })
        );
        scene.add(hitPlane);

        // Resize handler
        const handleResize = () => {
            if (!containerRef.current) return;
            camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        // Mouse move handler
        const handleMouseMove = (event: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        };

        const handleMouseLeave = () => {
            // Move mouse out of bounds to stop effect
            mouse.x = -999;
            mouse.y = -999;
        };

        const containerNode = containerRef.current;
        containerNode.addEventListener('mousemove', handleMouseMove);
        containerNode.addEventListener('mouseleave', handleMouseLeave);

        // Animation Loop
        const clock = new THREE.Clock();
        let animationFrameId: number;

        const animate = () => {
            const elapsedTime = clock.getElapsedTime();
            customShaderMaterial.uniforms.uTime.value = elapsedTime;

            // Update mouse world position
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(hitPlane);

            // Smoothly move the shader's mouse uniform
            if (intersects.length > 0) {
                const target = intersects[0].point;
                const current = customShaderMaterial.uniforms.uMouse.value;
                current.lerp(target, 0.15); // Spring-like following
            } else {
                // If not hit, move mouse infinitely far
                customShaderMaterial.uniforms.uMouse.value.lerp(new THREE.Vector3(999, 999, 999), 0.1);
            }

            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            containerNode.removeEventListener('mousemove', handleMouseMove);
            containerNode.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
            containerNode.removeChild(renderer.domElement);
            geometry.dispose();
            customShaderMaterial.dispose();
            renderer.dispose();
        };
    }, [color, particleCount, radius]);

    return <div ref={containerRef} className="w-full h-full absolute inset-0 mix-blend-screen" />;
}
