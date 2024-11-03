"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export const Globe = () => {
  const refContainer = useRef(null);
  const color = new THREE.Color().setHex(0x18181b);
  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = color;
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    refContainer.current &&
      refContainer.current.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    }

    animate();
  }, []);
  return <div ref={refContainer}></div>;
};
