import "@/app/styles/langAnimation.css";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export const LangAnimation: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, 1000); // Opóźnienie 1 sekundy
          }
        });
      },
      { threshold: 0.1 } // Aktywacja, gdy 10% kontenera jest widoczne
    );

    if (mountRef.current) {
      observer.observe(mountRef.current);
    }

    return () => {
      if (mountRef.current) {
        observer.unobserve(mountRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    renderer.setClearColor(0x000000, 0);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    scene.add(light);

    camera.position.z = 5;

    // Modele do przełączania
    const models = ["3D/logos/python.glb", "3D/logos/C++.glb"];
    let currentModelIndex = 0;
    let currentModel: THREE.Object3D | null = null;

    const loader = new GLTFLoader();

    // Funkcja ładowania modelu
    const loadModel = (
      modelPath: string,
      onLoaded: (model: THREE.Object3D) => void
    ) => {
      loader.load(
        modelPath,
        (gltf) => {
          const model = gltf.scene;
          onLoaded(model);
        },
        undefined,
        (error) => {
          console.error("Error loading GLTF model:", error);
        }
      );
    };

    // Funkcja animacji pojawiania się modelu
    const fadeInModel = (model: THREE.Object3D) => {
      let opacity = 0;
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.transparent = true;
          child.material.opacity = opacity;
        }
      });

      const fadeIn = () => {
        opacity += 0.01;
        if (opacity <= 1) {
          model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.material.opacity = opacity;
            }
          });
          requestAnimationFrame(fadeIn);
        }
      };
      fadeIn();
    };

    // Funkcja animacji znikania modelu
    const fadeOutModel = (model: THREE.Object3D, onComplete: () => void) => {
      let opacity = 1;
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.transparent = true;
          child.material.opacity = opacity;
        }
      });

      const fadeOut = () => {
        opacity -= 0.02;
        if (opacity > 0) {
          model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.material.opacity = opacity;
            }
          });
          requestAnimationFrame(fadeOut);
        } else {
          onComplete();
        }
      };
      fadeOut();
    };

    // Funkcja zmiany modelu
    const switchModel = () => {
      if (currentModel) {
        fadeOutModel(currentModel, () => {
          scene.remove(currentModel!);
          loadNextModel();
        });
      } else {
        loadNextModel();
      }
    };

    const loadNextModel = () => {
      loadModel(models[currentModelIndex], (model) => {
        currentModel = model;
        currentModel.position.y = 0; // Reset pozycji
        scene.add(currentModel);

        fadeInModel(currentModel);

        currentModelIndex = (currentModelIndex + 1) % models.length;
      });
    };

    // Animacja góra-dół
    let time = 0; // Użyjemy tej zmiennej do sinusoidalnego ruchu

    // Inicjalne załadowanie modelu
    switchModel();

    // Funkcja animacji
    const animate = () => {
      requestAnimationFrame(animate);

      // Animacja góra-dół (sinusoidalna, delikatna)
      if (currentModel) {
        currentModel.position.y = Math.sin(time) * 0.2; // Amplituda ruchu góra-dół
        time += 0.02; // Częstotliwość ruchu
        currentModel.rotation.y += 0.02; // Obrót modelu
      }

      renderer.render(scene, camera);
    };

    animate();

    // Zmieniaj modele co 5 sekund
    const switchInterval = setInterval(switchModel, 5000);

    return () => {
      clearInterval(switchInterval); // Usuń interwał przy odmontowaniu komponentu
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [isVisible]);

  return <div ref={mountRef} className="lang" />;
};
