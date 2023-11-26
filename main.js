dont={
        name: "Eyes",
        link: `all mobs look at you`,
        isFieldTech: true,
        maxCount: 1,
        count: 0,
        frequency: 1,
        frequencyDefault: 200,
        allowed() {
            return true
        },
        requires: "",
        effect() {
            tech.eyes=true;
            simulation.test=function(){
                mob.forEach(e=>{
                    function createEyeBall(x, y, radius, pupilColor,eyeColor) {
        			  	const pupilRadius = radius / 2; 
        			  	const irisRadius = pupilRadius / 2;
        				return function updatePupilPosition(playerX, playerY) {
        					const deltaX = playerX - x;
        					const deltaY = playerY - y;
        					const angle = Math.atan2(deltaY, deltaX);
        					const pupilX = Math.cos(angle) * (radius - pupilRadius);
        					const pupilY = Math.sin(angle) * (radius - pupilRadius);
        					const irisX = Math.cos(angle) * ((pupilRadius - irisRadius)+pupilRadius-10);
        					const irisY = Math.sin(angle) * ((pupilRadius - irisRadius)+pupilRadius-10);
        					ctx.beginPath();
        					ctx.arc(x, y, radius, 0, 2 * Math.PI);
        					ctx.fillStyle = 'white';
        					ctx.fill();
        					ctx.beginPath();
        					ctx.arc(x + pupilX, y + pupilY, pupilRadius, 0, 2 * Math.PI);
        					ctx.fillStyle = pupilColor;
        					ctx.fill();
        					ctx.beginPath();
        					ctx.arc(x + irisX, y + irisY, irisRadius, 0, 2 * Math.PI);
        					ctx.fillStyle = eyeColor;
        					ctx.fill();
        			  	};
        			};
                    let color=null;
                    let down=false;
                    if(e.isInvulnerable){
                        color="red"
                    };
                    else if(e.isStunned){
                        let colorList=["blue","purple","yellow"];
                        color=colorList[Math.floor(Math.random()*colorList.length)]
                    };
                    else{
                        color="cyan"
                    };
        			const updatePupil = createEyeBall(e.position.x, e.position.y, e.radius, "black",color);
        			function update() {
                        if(!down){
                            if(e.seePlayer.recall){
            				    const playerX = player.position.x; // Replace with actual player position;
            			  	    const playerY = player.position.y;
            			  	    updatePupil(playerX, playerY);
                            }
                            else{
                                ctx.strokeStyle = 'red';
                                ctx.lineWidth = 5;
                                const range = Math.PI * e.lookRange;
                                const startX = e.position.x + e.radius * 2.5 * Math.cos(e.angle - range);
                                const startY = e.position.y + e.radius * 2.5 * Math.sin(e.angle - range);
                            
                                const endX = e.position.x + e.radius * 2.5 * Math.cos(e.angle + range);
                                const endY = e.position.y + e.radius * 2.5 * Math.sin(e.angle + range);
                            
                                const midX = (startX + endX) / 2;
                                const midY = (startY + endY) / 2;
                                updatePupil(midX,midY);
                            }
                        }
                        else{
                            updatePupil(e.position.x,e.position.y+100)
                        }
        			}
        			update()
                })
            }
            simulation.saveLoop=simulation.normalLoop;
            simulation.normalLoop=function(){
                simulation.gravity();
                Engine.update(engine, simulation.delta);
                simulation.wipe();
                simulation.textLog();
                if (m.onGround) {
                    m.groundControl()
                } else {
                    m.airControl()
                }
                m.move();
                m.look();
                simulation.camera();
                level.custom();
                powerUps.do();
                mobs.draw();
                simulation.draw.cons();
                simulation.draw.body();
                if (!m.isBodiesAsleep) mobs.loop();
                mobs.healthBar();
                m.draw();
                m.hold();
                // v.draw(); //working on visibility work in progress
                level.customTopLayer();
                simulation.draw.drawMapPath();
                b.fire();
                b.bulletRemove();
                b.bulletDraw();
                if (!m.isBodiesAsleep) b.bulletDo();
                simulation.drawCircle();
                simulation.runEphemera();
                // simulation.clip();
                simulation.test();
                ctx.restore();
                simulation.drawCursor();
                
                // simulation.pixelGraphics();
            }
            simulation.loop=simulation.normalLoop;
            function loop() {
                
                if(tech.eyes){  
                    requestAnimationFrame(loop);
                }
            }
            requestAnimationFrame(loop);
        },
        remove() {
            if(tech.eyes){
                simulation.normalLoop=simulation.saveLoop;
                simulation.loop=simulation.normalLoop
            }
            tech.eyes=false
            
        }
    };
tech.tech.push(dont);
console.log("'Eyes' loaded")
