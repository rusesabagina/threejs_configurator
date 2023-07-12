import './style.css'
import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let index, loader, model, model2, model3, model4, model5, model6, model7, model8, model9, selector, selector_desk;
			
			
			var scale = document.getElementById('scale');
			var colorit = document.getElementById('color');
			var colorit_leg = document.getElementById('color_leg');
			var color1 = new THREE.Color(colorit.value);
			var color2 = new THREE.Color(colorit_leg.value);
			var menu = document.getElementById('menu');
			const productsMenu = document.getElementById('firstSelection');
			var products = productsMenu.getElementsByClassName('product');
			const selection = document.getElementById('legs');
			const selection_desk = document.getElementById('desk');
			const back = document.getElementById('back');
			const menustart = document.getElementById('newMenu');
			
			back.addEventListener("click", function(){
				scale.value = "4";
				productsMenu.style.visibility = 'visible';
				menu.style.visibility = 'hidden';
				selection.style.visibility = 'hidden';
				selection_desk.style.visibility = 'hidden';
				colorit_leg.style.visibility = 'hidden';
				scene.remove(model,model2,model3,model4,model5,model6,model7,model8,model9);
				model3.scale.set( 0.4, 0.4, 0.4 );
				model9.scale.set( 0.4, 0.4, 0.4);
				model.scale.set( 0.4, 0.4, 0.4);
				model7.scale.set( 0.4, 0.4, 0.4 );
				model8.scale.set( 0.4, 0.4, 0.4);
				model2.scale.set( 0.4, 0.4, 0.4 );
				model4.scale.set( 0.4, 0.4, 0.4 );
				model6.scale.set( 0.4, 0.4, 0.4 );
			});
			scale.addEventListener("change", function(){
				model3.scale.set( 0.4, 0.4, scale.value/10 );
				model9.scale.set( scale.value/10, scale.value/5, scale.value/10 );
				model.scale.set( scale.value/10, scale.value/5, scale.value/10 );
				model7.scale.set( scale.value/10, 0.4, scale.value/10 );
				model8.scale.set( scale.value/10, 0.4, scale.value/10 );
				model2.scale.set( scale.value/10, 0.4, scale.value/10 );
				model4.scale.set( 0.4, 0.4, scale.value/10 );
				model6.scale.set( 0.4, 0.4, scale.value/10 );
			});
		
			menustart.addEventListener("click", function(){
				menustart.classList.replace("newMenu", "newMenuAfter");
			});
			
			
			
			const stats = new Stats();
			container.appendChild( stats.dom );
			

			const renderer = new THREE.WebGLRenderer( { antialias: true } );
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( window.innerWidth, window.innerHeight );
			renderer.outputEncoding = THREE.sRGBEncoding;
			container.appendChild( renderer.domElement );
      		renderer.shadowMap.enabled = true;

			const pmremGenerator = new THREE.PMREMGenerator( renderer );

      
			const scene = new THREE.Scene();
			scene.background = new THREE.Color( 0xfffff0 );
			scene.environment = pmremGenerator.fromScene( new RoomEnvironment(), 0.04 ).texture;
      		scene.fog = new THREE.Fog( 0xfffff0, 10, 25 );

			const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
			camera.position.set( 5, 4, 8 );

			const controls = new OrbitControls( camera, renderer.domElement );
			controls.target.set( 0, 0.5, 0 );
			controls.update();
     		controls.mouseButtons = {
        	LEFT: THREE.MOUSE.ROTATE,
        	MIDDLE: THREE.MOUSE.DOLLY,
      }
			controls.enablePan = true;
			controls.enableDamping = true;
      		controls.maxDistance = 10;
      		controls.minDistance = 5;
      		controls.maxAzimuthAngle = - Math.PI/2;
      		controls.maxPolarAngle = Math.PI/2;
      

      const dirLight = new THREE.DirectionalLight( 0xf5f5f5, 0.5);
				dirLight.position.set( 3, 10, 10 );
				dirLight.castShadow = true;
				dirLight.shadow.camera.top = 2;
				dirLight.shadow.camera.bottom = - 2;
				dirLight.shadow.camera.left = - 2;
				dirLight.shadow.camera.right = 2;
				dirLight.shadow.camera.near = 0.1;
				dirLight.shadow.camera.far = 40;
				scene.add( dirLight );


      // ground

				const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshPhongMaterial( { color: 0xfffff0, depthWrite: false } ) );
				mesh.rotation.x = - Math.PI/2;
				mesh.receiveShadow = true;
				mesh.position.set( 0, -0.8, 0 );
				scene.add( mesh );
				

      window.onresize = function () {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );

			};

					
		loader = new GLTFLoader();
		selection_desk.addEventListener("change", function(){
			scene.remove(model,model9);
			selector_desk = selection_desk.value;
			console.log(selector_desk);
			if(selector_desk === 'oval'){
				scene.add( model9);
				animate();
			}
			else{
				scene.add(model);
				animate();
			}
		})	
		loader.load( 'models/desk2.glb', function ( gltf ) {
			model9 = gltf.scene;
			model9.position.set( 0, 0, 0 );
			model9.scale.set( 0.4, 0.4, 0.4);
			 model9.receiveShadow = true;
				 colorit.addEventListener("change", function() {
				color1 = new THREE.Color(colorit.value);
				colorit.value = colorit.value;
				
			 
					 model9.traverse( function ( object ) {
						if ( object.isMesh ) {
								object.material.color.set(color1);
						   } });

	 } );
	 model9.traverse( function ( object ) {
		if ( object.isMesh ) {
			   object.castShadow = true;
			   object.material.color.set(color1);
		   } });
		   

			 

		 }, );
			loader.load( 'models/desk.glb', function ( gltf ) {
				model = gltf.scene;
				model.position.set( 0, 0, 0 );
				model.scale.set( 0.4, 0.4, 0.4);
         		model.receiveShadow = true;
				 	colorit.addEventListener("change", function() {
					color1 = new THREE.Color(colorit.value);
					colorit.value = colorit.value;
					
				 
         				model.traverse( function ( object ) {
							if ( object.isMesh ) {
		   						 object.material.color.set(color1);
		   					} });

         } );
		 model.traverse( function ( object ) {
			if ( object.isMesh ) {
				   object.castShadow = true;
				   object.material.color.set(color1);
			   } });
		

			 	

			 }, );
			 
			 selection.addEventListener("change", function(){
				scene.remove(model2,model7,model8);
				selector = selection.value;
				console.log(selector);
				if(selector === 'cross'){
					scene.add( model7);
					animate();
				}
				if(selector === 'connected'){
					scene.add( model8);
					animate();
				}
				else{
					scene.add(model2);
					animate();
				}
			})
			
			loader.load( 'models/legs3.glb', function ( gltf ) {

				model7 = gltf.scene;
				model7.position.set( 0, 0, 0 );
				model7.scale.set( 0.4, 0.4, 0.4);
				model7.receiveShadow = true;
				 	colorit_leg.addEventListener("change", function() {
					color2 = new THREE.Color(colorit_leg.value);
					colorit_leg.value = colorit_leg.value;
					
				 
         				model7.traverse( function ( object ) {
							if ( object.isMesh ) {
		  						 object.castShadow = true;
		   						 object.material.color.set(color2);
		   					} });

         } );
		 model7.traverse( function ( object ) {
			if ( object.isMesh ) {
				   object.castShadow = true;
					object.material.color.set(color2);
			   } });
			

			 }, undefined, function ( e ) {

			 	console.error( e );

			 } );
			 loader.load( 'models/legs2.glb', function ( gltf ) {

				model8 = gltf.scene;
				model8.position.set( 0, 0, 0 );
				model8.scale.set( 0.4, 0.4, 0.4);
			
				model8.receiveShadow = true;
				 	colorit_leg.addEventListener("change", function() {
					color2 = new THREE.Color(colorit_leg.value);
					colorit_leg.value = colorit_leg.value;
					
				 
         				model8.traverse( function ( object ) {
							if ( object.isMesh ) {
		  						 object.castShadow = true;
		   						 object.material.color.set(color2);
		   					} });

         } );
		 model8.traverse( function ( object ) {
			if ( object.isMesh ) {
				   object.castShadow = true;
					object.material.color.set(color2);
			   } });
	


			 }, undefined, function ( e ) {

			 	console.error( e );

			 } );
			 loader.load( 'models/legs.glb', function ( gltf ) {

				model2 = gltf.scene;
				model2.position.set( 0, 0, 0 );
				model2.scale.set( 0.4, 0.4, 0.4);
				model2.receiveShadow = true;
				 	colorit_leg.addEventListener("change", function() {
					color2 = new THREE.Color(colorit_leg.value);
					colorit_leg.value = colorit_leg.value;
					
				 
         				model2.traverse( function ( object ) {
							if ( object.isMesh ) {
		  						 object.castShadow = true;
		   						 object.material.color.set(color2);
		   					} });

         } );
		 model2.traverse( function ( object ) {
			if ( object.isMesh ) {
				   object.castShadow = true;
					object.material.color.set(color2);
			   } });
		


			 }, undefined, function ( e ) {

			 	console.error( e );

			 } );
			
			 loader.load( 'models/chair.glb', function ( gltf ) {
				
				model3 = gltf.scene;
				model3.position.set( 0, 0.2, 0 );
				model3.scale.set( 0.4, 0.4, 0.4);
				model3.receiveShadow = true;
				 	colorit.addEventListener("change", function() {
					color1 = new THREE.Color(colorit.value);
					colorit.value = colorit.value;
					
				 
         				model3.traverse( function ( object ) {
							if ( object.isMesh ) {
		  						 object.castShadow = true;
		   						 object.material.color.set(color1);
		   					} });

         } );
		 model3.traverse( function ( object ) {
			if ( object.isMesh ) {
				   object.castShadow = true;
					object.material.color.set(color1);
			   } });
						 	

			 }, undefined, function ( e ) {

			 	console.error( e );

			 } );
			 loader.load( 'models/bed.glb', function ( gltf ) {
				model4 = gltf.scene;
				model4.position.set( 0, -0.6, 0 );
				model4.scale.set( 0.4, 0.4, 0.4);
         		model4.receiveShadow = true;
				 	colorit.addEventListener("change", function() {
					color1 = new THREE.Color(colorit.value);
					colorit.value = colorit.value;
				 
         				model4.traverse( function ( object ) {
							if ( object.isMesh ) {
		   						 object.material.color.set(color1);
		   					} });

         } );
		 model4.traverse( function ( object ) {
			if ( object.isMesh ) {
				   object.castShadow = true;
				   object.material.color.set(color1);
			   } });
			 }, );

			 loader.load( 'models/cutting_board.glb', function ( gltf ) {
				model6 = gltf.scene;
				model6.position.set( 0, 0, 0 );
				model6.scale.set( 0.4, 0.4, 0.4);
         		model6.receiveShadow = true;
				 	colorit.addEventListener("change", function() {
					color1 = new THREE.Color(colorit.value);
					colorit.value = colorit.value;
				 
         				model6.traverse( function ( object ) {
							if ( object.isMesh ) {
		   						 object.material.color.set(color1);
		   					} });

         } );
		 model6.traverse( function ( object ) {
			if ( object.isMesh ) {
				   object.castShadow = true;
				   object.material.color.set(color1);
			   } });
			 }, );
			 for (var i = 0; i<products.length; i++){
				products[i].setAttribute('data-index', i);
				products[i].addEventListener("click", function(){
					productsMenu.style.visibility ='hidden';
					//menu.style.visibility = 'visible';
					index = (this.getAttribute('data-index'));

					if(index == 0){
					selection.style.visibility="visible";
					selection_desk.style.visibility="visible";
					colorit_leg.style.visibility="visible";
					scene.add(model);
					scene.add(model2);
					scale.max = "10";
					scale.min = "1";
					
					animate();
					}
					if(index == 1){
						scale.max = "6";
						scale.min = "3";
						scene.add(model3);
						animate();
						}
						if(index == 2){
							scale.max = "6";
							scale.min = "3";
							scene.add(model4);
							scene.add(model5);
							animate();
							}
							if(index == 3){
								scale.max = "10";
								scale.min = "1";
								scene.add(model6);
								animate();
								}
														
				});}
      function animate() {

		setTimeout(function(){

				requestAnimationFrame( animate );

		}, 1000/100);
		
				controls.update();
				
				stats.update();

				renderer.render( scene, camera );
				
				
				
			}
			
			