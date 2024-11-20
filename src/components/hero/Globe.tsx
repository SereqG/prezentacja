"use client";

import "@/app/styles/globe.css";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export const Globe = () => {
  const loader = new GLTFLoader();
  const refContainer = useRef(null);

  let earth;
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let velocity = new THREE.Vector2(0.003, 0.0003);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

    if (refContainer.current) {
      refContainer.current.appendChild(renderer.domElement);
    }

    loader.load(
      "/3D/earth.glb",
      function (gltf) {
        earth = gltf.scene;
        earth.scale.set(1, 1, 1);
        scene.add(earth);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    const topLight = new THREE.DirectionalLight(0xffffff, 4);
    topLight.position.set(-200, 0, 400);
    scene.add(topLight);

    if (window.innerWidth < 550) {
      camera.position.z = 8;
    } else if (window.innerWidth < 900) {
      camera.position.z = 6.5;
    } else {
      camera.position.z = 4;
    }

    function animate() {
      requestAnimationFrame(animate);

      if (earth) {
        if (!isDragging) {
          // Apply momentum to rotation when the mouse is released
          earth.rotation.y += velocity.x;
          earth.rotation.x += velocity.y;

          // Gradually reduce velocity for the damping effect
          velocity.multiplyScalar(0.95);

          // Stop rotation when velocity is close to zero
          if (velocity.length() < 0.001) {
            velocity.set(0, 0);
          }
        }

        // Clamp x-axis rotation to avoid flipping the model out of view
        earth.rotation.x = THREE.MathUtils.clamp(
          earth.rotation.x,
          -Math.PI / 2,
          Math.PI / 2
        );
      }

      renderer.render(scene, camera);
    }

    function onMouseDown(e) {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    }

    function onMouseUp() {
      isDragging = false;
    }

    function onMouseMove(e) {
      if (isDragging) {
        const deltaMove = {
          x: e.clientX - previousMousePosition.x,
          y: e.clientY - previousMousePosition.y,
        };

        // Update rotation based on drag movement
        earth.rotation.y += deltaMove.x * 0.005;
        earth.rotation.x += deltaMove.y * 0.005;

        // Set velocity for momentum
        velocity.x = deltaMove.x * 0.005;
        velocity.y = deltaMove.y * 0.005;

        // Update previous mouse position
        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    }

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);

    animate();

    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <div ref={refContainer} className="globe"></div>;
};
