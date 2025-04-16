var P=new Map,R={get:(J)=>{let K=J.startsWith("--")?J:`--${J}`;if(P.has(K))return P.get(K);let Q=getComputedStyle(document.documentElement).getPropertyValue(K).trim();if(!Q)return console.warn(`CSS variable ${K} not found or empty`),"#000000";return P.set(K,Q),Q},set:(J,K)=>{let Q=J.startsWith("--")?J:`--${J}`;if(P.get(Q)!==K)document.documentElement.style.setProperty(Q,K),P.set(Q,K)},clearCache:()=>{P.clear()},hexToRgb:(J)=>{if(J=J.replace(/^#/,""),J.length===3)J=J.split("").map((Q)=>Q+Q).join("");let K=parseInt(J,16);return{r:K>>16&255,g:K>>8&255,b:K&255}},lightenColor:(J,K)=>{let Q=J.replace("#",""),Z=parseInt(Q.substr(0,2),16),_=parseInt(Q.substr(2,2),16),$=parseInt(Q.substr(4,2),16),E=Math.min(Math.floor(Z*(1+K/100)),255),V=Math.min(Math.floor(_*(1+K/100)),255),q=Math.min(Math.floor($*(1+K/100)),255);return`rgb(${E}, ${V}, ${q})`},darkenColor:(J,K)=>{let Q=J.replace("#",""),Z=parseInt(Q.substr(0,2),16),_=parseInt(Q.substr(2,2),16),$=parseInt(Q.substr(4,2),16),E=Math.max(Math.floor(Z*(1-K/100)),0),V=Math.max(Math.floor(_*(1-K/100)),0),q=Math.max(Math.floor($*(1-K/100)),0);return`rgb(${E}, ${V}, ${q})`},isLightColor:(J)=>{let K=J.replace("#",""),Q=parseInt(K.substr(0,2),16),Z=parseInt(K.substr(2,2),16),_=parseInt(K.substr(4,2),16);return(Q*299+Z*587+_*114)/1000>125}};var j={gridSize:10,cellSize:40,get colors(){return[R.get("color-teal"),R.get("color-light-brown")]},get highlightColor(){return R.get("highlight-color")},get invalidColor(){return R.get("invalid-color")},pieceAreaHeight:150,pieceSize:80,pieceMargin:20,maxAvailablePieces:3,gameOverButton:{width:200,height:60,get color(){return R.get("button-background")},get hoverColor(){return R.get("button-hover")},get textColor(){return R.get("button-text")},font:"20px Arial",text:"Play Again"},get backgroundColor(){return R.get("background-color")},get gridLineColor(){return R.get("grid-line-color")},get textColor(){return R.get("text-color")},get borderColor(){return R.get("border-color")}};class F{name;color;pattern;frequency;constructor(J,K,Q,Z=1){this.name=J,this.pattern=K,this.color=Q,this.frequency=Math.max(0,Math.min(1,Z))}static shapes=[new F("Line5",[[!0,!0,!0,!0,!0]],"#3D8C9E",0.2),new F("LineVertical5",[[!0],[!0],[!0],[!0],[!0]],"#3D8C9E",0.2),new F("Line",[[!0,!0,!0,!0]],"#4682B4",0.2),new F("LineVertical",[[!0],[!0],[!0],[!0]],"#4682B4",0.2),new F("Line3",[[!0,!0,!0]],"#7B68EE",0.2),new F("LineVertical3",[[!0],[!0],[!0]],"#7B68EE",0.2),new F("Line2",[[!0,!0]],"#6A5ACD",0.2),new F("LineVertical2",[[!0],[!0]],"#6A5ACD",0.2),new F("Square2x2",[[!0,!0],[!0,!0]],"#D4AF91",0.7),new F("Square3x3",[[!0,!0,!0],[!0,!0,!0],[!0,!0,!0]],"#C19A6B",0.3),new F("TShape",[[!1,!0,!1],[!0,!0,!0]],"#9370DB",0.25),new F("TShapeFlipped",[[!0,!0,!0],[!1,!0,!1]],"#9370DB",0.25),new F("TShapeRight",[[!1,!0],[!0,!0],[!1,!0]],"#9370DB",0.25),new F("TShapeLeft",[[!0,!1],[!0,!0],[!0,!1]],"#9370DB",0.25),new F("LShape",[[!0,!1],[!0,!1],[!0,!0]],"#CD7F32",0.25),new F("LShapeRight",[[!0,!0,!0],[!0,!1,!1]],"#CD7F32",0.25),new F("LShapeUpside",[[!0,!0],[!1,!0],[!1,!0]],"#CD7F32",0.25),new F("LShapeLeft",[[!1,!1,!0],[!0,!0,!0]],"#CD7F32",0.25),new F("ZShape",[[!0,!0,!1],[!1,!0,!0]],"#B22222",0.25),new F("ZShapeReflected",[[!1,!0,!0],[!0,!0,!1]],"#B22222",0.25),new F("ZShapeVertical",[[!1,!0],[!0,!0],[!0,!1]],"#B22222",0.25),new F("ZShapeVerticalReflected",[[!0,!1],[!0,!0],[!1,!0]],"#B22222",0.25),new F("SmallL",[[!0,!1],[!0,!0]],"#6B8E23",0.25),new F("SmallLRight",[[!0,!0],[!0,!1]],"#6B8E23",0.25),new F("SmallLUpside",[[!0,!0],[!1,!0]],"#6B8E23",0.25),new F("SmallLLeft",[[!1,!0],[!0,!0]],"#6B8E23",0.25),new F("Single",[[!0]],"#87CEEB",1)];static all(){return[...this.shapes]}static random(){let J=this.shapes.reduce((Q,Z)=>Q+Z.frequency,0),K=Math.random()*J;for(let Q of this.shapes)if(K-=Q.frequency,K<=0)return Q;return this.shapes[0]}static byName(J){return this.shapes.find((K)=>K.name===J)}static randomPattern(){return this.random().pattern}}class k{shape;color;x;y;isAvailable;shapeName;scaleFactor;constructor(J,K,Q){if(this.x=0,this.y=0,this.isAvailable=!0,J)this.shape=J,this.shapeName="custom",this.color=Q||j.colors[Math.floor(Math.random()*j.colors.length)];else{let Z=F.random();this.shape=Z.pattern,this.shapeName=Z.name,this.color=Z.color}if(K!==void 0){let Z=j.gridSize*j.cellSize,_=this.shape[0].length,$=this.shape.length,E=4,V=_>4?4/_:1,q=j.cellSize*V,O=_*q,M=$*q,U=Z/j.maxAvailablePieces;this.x=U/2-O/2+K*U;let D=j.gridSize*j.cellSize;this.y=D+j.pieceAreaHeight/2-M/2,this.scaleFactor=V}}generateRandomShape(){return F.randomPattern()}contains(J,K){let Q=j.cellSize*(this.scaleFactor||1),Z=this.x,_=this.x+this.shape[0].length*Q,$=this.y,E=this.y+this.shape.length*Q;if(J>=Z&&J<_&&K>=$&&K<E){let V=Math.floor((J-this.x)/Q),q=Math.floor((K-this.y)/Q);if(V>=0&&V<this.shape[0].length&&q>=0&&q<this.shape.length)return this.shape[q][V]}return!1}render(J){let K=j.cellSize*(this.scaleFactor||1);for(let Q=0;Q<this.shape.length;Q++)for(let Z=0;Z<this.shape[Q].length;Z++)if(this.shape[Q][Z]){let _=this.x+Z*K,$=this.y+Q*K;this.drawBlockWithEffect(J,_,$,K)}}drawBlockWithEffect(J,K,Q,Z){J.fillStyle=this.color,J.fillRect(K,Q,Z,Z),J.fillStyle=this.lightenColor(this.color,15),J.beginPath(),J.moveTo(K,Q),J.lineTo(K+Z,Q),J.lineTo(K+Z-4,Q+4),J.lineTo(K+4,Q+4),J.closePath(),J.fill(),J.fillStyle=this.darkenColor(this.color,15),J.beginPath(),J.moveTo(K+Z,Q),J.lineTo(K+Z,Q+Z),J.lineTo(K+Z-4,Q+Z-4),J.lineTo(K+Z-4,Q+4),J.closePath(),J.fill(),J.fillStyle=this.darkenColor(this.color,25),J.beginPath(),J.moveTo(K,Q+Z),J.lineTo(K+Z,Q+Z),J.lineTo(K+Z-4,Q+Z-4),J.lineTo(K+4,Q+Z-4),J.closePath(),J.fill(),J.fillStyle=this.lightenColor(this.color,5),J.beginPath(),J.moveTo(K,Q),J.lineTo(K,Q+Z),J.lineTo(K+4,Q+Z-4),J.lineTo(K+4,Q+4),J.closePath(),J.fill(),J.strokeStyle="#3F3A33",J.lineWidth=1,J.strokeRect(K,Q,Z,Z),this.drawSymbolOnBlock(J,K,Q,Z)}drawSymbolOnBlock(J,K,Q,Z){let _=Z*0.2,$=Z-_*2,E=this.isLightColor(this.color);switch(J.fillStyle=E?this.darkenColor(this.color,30):this.lightenColor(this.color,30),J.strokeStyle=E?this.darkenColor(this.color,30):this.lightenColor(this.color,30),J.lineWidth=2,this.shapeName){case"Line":J.beginPath(),J.moveTo(K+_,Q+Z/2),J.lineTo(K+Z-_,Q+Z/2),J.stroke();break;case"Line3":J.beginPath(),J.moveTo(K+_*1.2,Q+Z/2),J.lineTo(K+Z-_*1.2,Q+Z/2),J.stroke(),J.beginPath(),J.arc(K+Z*0.25,Q+Z/2,Z*0.06,0,Math.PI*2),J.arc(K+Z*0.5,Q+Z/2,Z*0.06,0,Math.PI*2),J.arc(K+Z*0.75,Q+Z/2,Z*0.06,0,Math.PI*2),J.fill();break;case"Line5":J.beginPath(),J.moveTo(K+_*0.8,Q+Z/2),J.lineTo(K+Z-_*0.8,Q+Z/2),J.stroke(),J.beginPath();for(let V=1;V<=5;V++)J.arc(K+Z*V/6,Q+Z/2,Z*0.05,0,Math.PI*2);J.fill();break;case"Line2":J.beginPath(),J.moveTo(K+_*1.5,Q+Z/2),J.lineTo(K+Z-_*1.5,Q+Z/2),J.stroke();break;case"LineVertical":J.beginPath(),J.moveTo(K+Z/2,Q+_),J.lineTo(K+Z/2,Q+Z-_),J.stroke();break;case"LineVertical3":J.beginPath(),J.moveTo(K+Z/2,Q+_*1.2),J.lineTo(K+Z/2,Q+Z-_*1.2),J.stroke(),J.beginPath(),J.arc(K+Z/2,Q+Z*0.25,Z*0.06,0,Math.PI*2),J.arc(K+Z/2,Q+Z*0.5,Z*0.06,0,Math.PI*2),J.arc(K+Z/2,Q+Z*0.75,Z*0.06,0,Math.PI*2),J.fill();break;case"LineVertical5":J.beginPath(),J.moveTo(K+Z/2,Q+_*0.8),J.lineTo(K+Z/2,Q+Z-_*0.8),J.stroke(),J.beginPath();for(let V=1;V<=5;V++)J.arc(K+Z/2,Q+Z*V/6,Z*0.05,0,Math.PI*2);J.fill();break;case"LineVertical2":J.beginPath(),J.moveTo(K+Z/2,Q+_*1.5),J.lineTo(K+Z/2,Q+Z-_*1.5),J.stroke();break;case"Square2x2":J.strokeRect(K+_,Q+_,$,$);break;case"TShape":J.beginPath(),J.moveTo(K+Z/2,Q+_),J.lineTo(K+Z/2,Q+Z-_),J.moveTo(K+_,Q+_),J.lineTo(K+Z-_,Q+_),J.stroke();break;case"LShape":J.beginPath(),J.moveTo(K+_+$/3,Q+_),J.lineTo(K+_+$/3,Q+Z-_),J.lineTo(K+Z-_,Q+Z-_),J.stroke();break;case"ZShape":J.beginPath(),J.moveTo(K+_,Q+_),J.lineTo(K+Z-_,Q+_),J.lineTo(K+_,Q+Z-_),J.lineTo(K+Z-_,Q+Z-_),J.stroke();break;case"Single":J.beginPath(),J.arc(K+Z/2,Q+Z/2,$/5,0,Math.PI*2),J.fill();break;case"SmallL":J.beginPath(),J.moveTo(K+_+$/3,Q+_),J.lineTo(K+_+$/3,Q+Z-_),J.lineTo(K+Z-_,Q+Z-_),J.stroke();break;case"Square3x3":J.strokeRect(K+_,Q+_,$,$),J.strokeRect(K+_+$/4,Q+_+$/4,$/2,$/2);break;default:J.beginPath(),J.arc(K+Z/2,Q+Z/2,$/3,0,Math.PI*2),J.stroke()}}lightenColor(J,K){let Q=J.replace("#",""),Z=parseInt(Q.substr(0,2),16),_=parseInt(Q.substr(2,2),16),$=parseInt(Q.substr(4,2),16),E=Math.min(Math.floor(Z*(1+K/100)),255),V=Math.min(Math.floor(_*(1+K/100)),255),q=Math.min(Math.floor($*(1+K/100)),255);return`rgb(${E}, ${V}, ${q})`}darkenColor(J,K){let Q=J.replace("#",""),Z=parseInt(Q.substr(0,2),16),_=parseInt(Q.substr(2,2),16),$=parseInt(Q.substr(4,2),16),E=Math.max(Math.floor(Z*(1-K/100)),0),V=Math.max(Math.floor(_*(1-K/100)),0),q=Math.max(Math.floor($*(1-K/100)),0);return`rgb(${E}, ${V}, ${q})`}isLightColor(J){let K=J.replace("#",""),Q=parseInt(K.substr(0,2),16),Z=parseInt(K.substr(2,2),16),_=parseInt(K.substr(4,2),16);return(Q*299+Z*587+_*114)/1000>125}}class W{cells=[];constructor(){this.reset()}reset(){this.cells=Array(j.gridSize).fill(null).map(()=>Array(j.gridSize).fill(null))}setCellState(J,K,Q){if(J>=0&&J<j.gridSize&&K>=0&&K<j.gridSize)this.cells[K][J]=Q}serialize(){return this.cells.map((J)=>J.map((K)=>K||""))}static deserialize(J){let K=new W,Q=Math.min(J.length,j.gridSize);for(let Z=0;Z<Q;Z++){let _=J[Z],$=Math.min(_.length,j.gridSize);for(let E=0;E<$;E++)K.cells[Z][E]=_[E]||null}return K}isCellOccupied(J,K){if(J<0||K<0||J>=j.gridSize||K>=j.gridSize)return!0;return this.cells[K][J]!==null}clone(){let J=new W;return J.cells=this.cells.map((K)=>[...K]),J}}function L(J){document.dispatchEvent(new CustomEvent("score-updated",{detail:{score:J},bubbles:!0,composed:!0}));let K=document.getElementById("score");if(K)K.textContent=J.toString()}function A(J,K){for(let Q=0;Q<K.length;Q++)if(K[Q].isAvailable)K[Q].render(J)}function f(J,K){let Z=J.canvas.width,_=j.gridSize*j.cellSize;J.fillStyle="rgba(0, 0, 0, 0.7)",J.fillRect(0,0,Z,_+j.pieceAreaHeight),J.font="36px Arial",J.fillStyle="white",J.textAlign="center",J.textBaseline="middle",J.fillText("Game Over!",Z/2,_/3),J.font="28px Arial",J.fillText(`Final Score: ${K}`,Z/2,_/2)}function G(J,K){let Z=J.canvas.width,_=j.gridSize*j.cellSize,$=j.gameOverButton,E=(Z-$.width)/2,V=_*0.65;J.fillStyle=K?$.hoverColor:$.color,J.strokeStyle="rgba(0, 0, 0, 0.3)",J.lineWidth=2;let q=8;return J.beginPath(),J.moveTo(E+q,V),J.lineTo(E+$.width-q,V),J.quadraticCurveTo(E+$.width,V,E+$.width,V+q),J.lineTo(E+$.width,V+$.height-q),J.quadraticCurveTo(E+$.width,V+$.height,E+$.width-q,V+$.height),J.lineTo(E+q,V+$.height),J.quadraticCurveTo(E,V+$.height,E,V+$.height-q),J.lineTo(E,V+q),J.quadraticCurveTo(E,V,E+q,V),J.closePath(),J.fill(),J.stroke(),J.font=$.font,J.fillStyle=$.textColor,J.textAlign="center",J.textBaseline="middle",J.fillText($.text,E+$.width/2,V+$.height/2),{x:E,y:V,width:$.width,height:$.height}}function v(J,K,Q,Z,_,$){return J>=Q&&J<=Q+_&&K>=Z&&K<=Z+$}class H{canvas;ctx;board;score;isChallengeMode=!1;challengeOutlineColor="#FFD700";challengeOutlineWidth=4;constructor(J,K=0){this.canvas=J,this.ctx=J.getContext("2d"),this.score=K,this.board=new W,this.render()}setChallengeMode(J){this.isChallengeMode=J}render(){let J=this.ctx,K=j.cellSize,Q=j.gridSize*K;J.fillStyle=j.backgroundColor,J.fillRect(0,0,this.canvas.width,this.canvas.height),J.strokeStyle=j.gridLineColor,J.lineWidth=1;for(let V=0;V<=j.gridSize;V++)J.beginPath(),J.moveTo(0,V*K),J.lineTo(this.canvas.width,V*K),J.stroke(),J.beginPath(),J.moveTo(V*K,0),J.lineTo(V*K,Q),J.stroke();for(let V=0;V<j.gridSize;V++)for(let q=0;q<j.gridSize;q++){let O=this.board.cells[V][q];if(O){J.fillStyle=O,J.strokeStyle="#3F3A33",J.lineWidth=2;let M=q*K,U=V*K;J.fillRect(M,U,K,K),J.fillStyle=this.lightenColor(O,15),J.beginPath(),J.moveTo(M,U),J.lineTo(M+K,U),J.lineTo(M+K-4,U+4),J.lineTo(M+4,U+4),J.closePath(),J.fill(),J.fillStyle=this.darkenColor(O,15),J.beginPath(),J.moveTo(M+K,U),J.lineTo(M+K,U+K),J.lineTo(M+K-4,U+K-4),J.lineTo(M+K-4,U+4),J.closePath(),J.fill(),J.strokeRect(M,U,K,K)}}if(this.isChallengeMode){J.beginPath(),J.strokeStyle=this.challengeOutlineColor,J.lineWidth=this.challengeOutlineWidth;let V=this.challengeOutlineWidth/2;J.strokeRect(V,V,j.gridSize*K-this.challengeOutlineWidth,j.gridSize*K-this.challengeOutlineWidth)}J.beginPath(),J.strokeStyle=j.borderColor,J.lineWidth=2,J.moveTo(0,Q),J.lineTo(this.canvas.width,Q),J.stroke();let Z=Q+20,_="Available Pieces";J.font="16px Arial",J.textAlign="center",J.fillStyle="rgba(30, 28, 25, 0.7)";let $=J.measureText(_).width+10,E=20;J.fillRect(this.canvas.width/2-$/2,Z-E+4,$,E),J.fillStyle=j.textColor,J.fillText(_,this.canvas.width/2,Z)}lightenColor(J,K){let Q=J.replace("#",""),Z=parseInt(Q.substr(0,2),16),_=parseInt(Q.substr(2,2),16),$=parseInt(Q.substr(4,2),16),E=Math.min(Math.floor(Z*(1+K/100)),255),V=Math.min(Math.floor(_*(1+K/100)),255),q=Math.min(Math.floor($*(1+K/100)),255);return`rgb(${E}, ${V}, ${q})`}darkenColor(J,K){let Q=J.replace("#",""),Z=parseInt(Q.substr(0,2),16),_=parseInt(Q.substr(2,2),16),$=parseInt(Q.substr(4,2),16),E=Math.max(Math.floor(Z*(1-K/100)),0),V=Math.max(Math.floor(_*(1-K/100)),0),q=Math.max(Math.floor($*(1-K/100)),0);return`rgb(${E}, ${V}, ${q})`}canPlacePiece(J,K,Q){for(let Z=0;Z<J.shape.length;Z++)for(let _=0;_<J.shape[Z].length;_++)if(J.shape[Z][_]){let $=K+_,E=Q+Z;if($<0||$>=j.gridSize||E<0||E>=j.gridSize)return!1;if(this.board.cells[E][$]!==null)return!1}return!0}placePiece(J,K,Q){if(!this.canPlacePiece(J,K,Q))return!1;let Z=0;for(let _=0;_<J.shape.length;_++)for(let $=0;$<J.shape[_].length;$++)if(J.shape[_][$])this.board.cells[Q+_][K+$]=J.color,Z++;return this.score+=Z*15,L(this.score),this.render(),this.checkForCompleteLines(),!0}highlightValidPlacement(J,K,Q,Z){if(!J)return;let _=j.cellSize,$=this.canPlacePiece(J,K,Q);Z.globalAlpha=0.3,Z.fillStyle=$?j.highlightColor:j.invalidColor;for(let E=0;E<J.shape.length;E++)for(let V=0;V<J.shape[E].length;V++)if(J.shape[E][V]){let q=K*_+V*_,O=Q*_+E*_;Z.fillRect(q,O,_,_)}Z.globalAlpha=1}checkForCompleteLines(){let J=0,K=new Set;for(let Q=0;Q<j.gridSize;Q++)if(this.board.cells[Q].every((Z)=>Z!==null)){for(let Z=0;Z<j.gridSize;Z++)K.add(`${Q},${Z}`);J++}for(let Q=0;Q<j.gridSize;Q++)if(this.board.cells.map((_)=>_[Q]).every((_)=>_!==null)){for(let _=0;_<j.gridSize;_++)K.add(`${_},${Q}`);J++}if(K.size>0){K.forEach((_)=>{let[$,E]=_.split(",").map(Number);this.board.cells[$][E]=null});let Q=250,Z=J>1?J:1;if(this.score+=Q*J*Z,J>1)this.showMultiLineBonus(J);L(this.score),this.render()}return J}showMultiLineBonus(J){let K=`${J}x MULTIPLIER!`;document.dispatchEvent(new CustomEvent("game-toast",{detail:{message:K,type:"bonus"},bubbles:!0,composed:!0}))}setCellState(J,K,Q){this.board.setCellState(J,K,Q)}setBoard(J){this.board=J,this.render()}clearGrid(){this.board.reset(),this.render()}getBoard(){return this.board}}var N=(J)=>j.colors[J%j.colors.length],T={rowColClear:{name:"Row & Column Clear Test",description:"Test clearing both a row and column simultaneously",boardState:Array(j.gridSize).fill("").map((J,K)=>Array(j.gridSize).fill("").map((Q,Z)=>{if(K===5&&Z!==5)return N(0);if(Z===5&&K!==5)return N(1);return""})),availablePieces:[{shape:[[!0]],color:N(0)}]},multiRowClear:{name:"Multi-Row Clear Test",description:"Test clearing multiple rows simultaneously",boardState:Array(j.gridSize).fill("").map((J,K)=>Array(j.gridSize).fill("").map((Q,Z)=>{if(K===3&&Z<j.gridSize-1)return N(0);if(K===5&&Z<j.gridSize-1)return N(1);return""})),availablePieces:[{shape:[[!0],[!0]],color:N(0)}]},customPieces:{name:"Custom Test Pieces",description:"Empty board with custom test pieces",boardState:Array(j.gridSize).fill("").map(()=>Array(j.gridSize).fill("")),availablePieces:[{shape:[[!0]],color:N(0)},{shape:[[!0,!1],[!0,!0]],color:N(1)},{shape:[[!0,!0,!0],[!1,!0,!1]],color:N(0)}]},complexClears:{name:"Complex Clear Scenarios",description:"Complex test scenario with multiple potential line clears",boardState:Array(j.gridSize).fill("").map((J,K)=>Array(j.gridSize).fill("").map((Q,Z)=>{if(K===2&&Z<j.gridSize-2)return N(0);if(K===5&&Z>0&&Z<j.gridSize-1)return N(1);if(Z===2&&K<j.gridSize-2)return N(1);if(Z===5&&K>0&&K<j.gridSize-1)return N(0);return""})),availablePieces:[{shape:[[!0,!0],[!0,!1]],color:N(0)},{shape:[[!0,!0],[!0,!0]],color:N(1)},{shape:[[!0,!0,!0]],color:N(0)}]}};class C{score=0;isDragging=!1;activePiece=null;dragStartX=0;dragStartY=0;dragCurrentX=0;dragCurrentY=0;animationFrameId=null;availablePieces=[];isGameOver=!1;finalScore=0;hoveringPlayButton=!1;grid;mainCanvas;overlayCanvas;mainCtx;overlayCtx;cursorOffset=40;moveCount=0;isChallengeMode=!1;challengeModeInterval=10;challengeBonusPoints=300;constructor(){this.mainCanvas=document.getElementById("main-canvas"),this.overlayCanvas=document.getElementById("overlay-canvas"),this.mainCtx=this.mainCanvas.getContext("2d"),this.overlayCtx=this.overlayCanvas.getContext("2d");let J=j.gridSize*j.cellSize+j.pieceAreaHeight;this.mainCanvas.width=j.gridSize*j.cellSize,this.mainCanvas.height=J,this.overlayCanvas.width=j.gridSize*j.cellSize,this.overlayCanvas.height=J,this.grid=new H(this.mainCanvas,this.score),this.setupEventListeners(),document.addEventListener("request-score-update",this.onScoreUpdateRequest.bind(this))}initialize(){this.generateInitialPieces(),A(this.overlayCtx,this.availablePieces)}setupEventListeners(){this.overlayCanvas.addEventListener("mousedown",this.onCanvasMouseDown.bind(this)),this.overlayCanvas.addEventListener("touchstart",this.onCanvasTouchStart.bind(this),{passive:!1}),this.setupGameOverEvents(),document.getElementById("new-game-btn")?.addEventListener("click",()=>this.newGame())}generateInitialPieces(){for(let J=0;J<j.maxAvailablePieces;J++)this.generateNewPiece()}generateNewPiece(){for(let J=0;J<j.maxAvailablePieces;J++)if(!this.availablePieces[J]||!this.availablePieces[J].isAvailable){let K=new k(void 0,J);if(J<this.availablePieces.length)this.availablePieces[J]=K;else this.availablePieces.push(K);return}}findPieceAtPosition(J,K){let Q=this.overlayCanvas.width,Z=j.gridSize*j.cellSize;if(K>Z){let _=Math.floor(J/Q*j.maxAvailablePieces),$=Math.max(0,Math.min(j.maxAvailablePieces-1,_));if(this.availablePieces[$]&&this.availablePieces[$].isAvailable)return this.availablePieces[$]}else for(let _=this.availablePieces.length-1;_>=0;_--){let $=this.availablePieces[_];if($.isAvailable&&$.contains(J,K))return $}return null}animateDrag(){if(this.overlayCtx.clearRect(0,0,this.overlayCanvas.width,this.overlayCanvas.height),A(this.overlayCtx,this.availablePieces),this.isDragging&&this.activePiece){let J=j.cellSize,K=this.dragCurrentX-this.dragStartX,Q=this.dragCurrentY-this.dragStartY;if(this.activePiece.x+=K,this.activePiece.y+=Q,this.dragStartX=this.dragCurrentX,this.dragStartY=this.dragCurrentY,this.activePiece.scaleFactor&&this.activePiece.scaleFactor<1){let M=this.activePiece.scaleFactor,U=this.activePiece.shape[0].length*J*M,D=this.activePiece.shape.length*J*M,w=this.activePiece.x+U/2,X=this.activePiece.y+D/2;this.activePiece.scaleFactor=1;let Y=this.activePiece.shape[0].length*J,I=this.activePiece.shape.length*J;this.activePiece.x=w-Y/2,this.activePiece.y=X-I/2}let Z=this.activePiece.shape[0].length,_=this.activePiece.shape.length,$=this.activePiece.x,E=this.activePiece.y,V=Math.floor(($+J/2)/J),q=Math.floor((E+J/2)/J),O=q>=0&&q+_<=j.gridSize&&V>=0&&V+Z<=j.gridSize;if(this.activePiece.render(this.overlayCtx),O)this.grid.highlightValidPlacement(this.activePiece,V,q,this.overlayCtx);this.animationFrameId=requestAnimationFrame(this.animateDrag.bind(this))}else if(this.animationFrameId!==null)cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null}tryPlacePiece(J,K){if(!this.activePiece)return;if(this.grid.placePiece(this.activePiece,J,K)){if(this.activePiece.isAvailable=!1,this.score=this.grid.score,L(this.score),this.moveCount++,!this.isChallengeMode&&this.moveCount%this.challengeModeInterval===0)this.activateChallengeMode();if(this.isChallengeMode)this.checkChallengeCompletion();else this.generateNewPiece();this.checkGameOver()}else this.repositionAvailablePieces()}repositionAvailablePieces(){for(let J=0;J<this.availablePieces.length;J++)if(this.availablePieces[J].isAvailable){let K=j.gridSize*j.cellSize,Q=this.availablePieces[J].shape[0].length*j.cellSize,Z=this.availablePieces.filter((V)=>V.isAvailable).length,_=K/j.maxAvailablePieces;this.availablePieces[J].x=_/2-Q/2+J*_;let $=j.gridSize*j.cellSize,E=this.availablePieces[J].shape.length*j.cellSize;this.availablePieces[J].y=$+j.pieceAreaHeight/2-E/2}}checkGameOver(){let J=!1;for(let K of this.availablePieces){if(!K.isAvailable)continue;for(let Q=0;Q<j.gridSize;Q++)for(let Z=0;Z<j.gridSize;Z++)if(this.grid.canPlacePiece(K,Z,Q)){J=!0;return}}if(!J){if(this.isGameOver=!0,this.finalScore=this.score,f(this.mainCtx,this.finalScore),this.overlayCtx.clearRect(0,0,this.overlayCanvas.width,this.overlayCanvas.height),G(this.overlayCtx,!1),this.animationFrameId!==null)cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null}}loadTestScenario(J){if(!T[J]){console.error(`Scenario "${J}" not found.`);return}this.grid.clearGrid(),this.score=0;let K=T[J],Q=new W;K.boardState.forEach((Z,_)=>{Z.forEach(($,E)=>{if($)Q.setCellState(E,_,$)})}),this.grid.setBoard(Q),this.availablePieces=[],K.availablePieces.forEach((Z,_)=>{if(_<j.maxAvailablePieces){let $=new k(Z.shape,_);$.color=Z.color,this.availablePieces.push($)}});while(this.availablePieces.length<j.maxAvailablePieces)this.generateNewPiece();this.grid.render(),this.overlayCtx.clearRect(0,0,this.overlayCanvas.width,this.overlayCanvas.height),A(this.overlayCtx,this.availablePieces),L(this.score)}newGame(J){this.score=0,this.isGameOver=!1,L(this.score),this.grid=new H(this.mainCanvas,this.score),this.availablePieces=[];for(let K=0;K<j.maxAvailablePieces;K++)this.generateNewPiece();if(J)this.loadTestScenario(J);else this.overlayCtx.clearRect(0,0,this.overlayCanvas.width,this.overlayCanvas.height),A(this.overlayCtx,this.availablePieces)}setupGameOverEvents(){this.overlayCanvas.addEventListener("mousemove",this.onCanvasMouseMove.bind(this)),this.overlayCanvas.addEventListener("click",this.onCanvasClick.bind(this))}setInitialPiecePosition(J,K,Q){let Z=j.cellSize*(J.scaleFactor||1),_=J.shape[0].length*Z,$=J.shape.length*Z;J.x=K-_/2,J.y=Q-$-this.cursorOffset}onScoreUpdateRequest(){L(this.score)}onCanvasMouseMove(J){if(!this.isGameOver)return;let K=this.overlayCanvas.getBoundingClientRect(),Q=(J.clientX-K.left)*(this.overlayCanvas.width/K.width),Z=(J.clientY-K.top)*(this.overlayCanvas.height/K.height),_=G(this.overlayCtx,!1),$=v(Q,Z,_.x,_.y,_.width,_.height);if($!==this.hoveringPlayButton)this.hoveringPlayButton=$,this.overlayCtx.clearRect(0,0,this.overlayCanvas.width,this.overlayCanvas.height),G(this.overlayCtx,$)}onCanvasClick(J){if(!this.isGameOver)return;let K=this.overlayCanvas.getBoundingClientRect(),Q=(J.clientX-K.left)*(this.overlayCanvas.width/K.width),Z=(J.clientY-K.top)*(this.overlayCanvas.height/K.height),_=G(this.overlayCtx,!1);if(v(Q,Z,_.x,_.y,_.width,_.height))this.newGame()}onCanvasMouseDown(J){if(this.isGameOver)return;let K=this.overlayCanvas.getBoundingClientRect(),Q=(J.clientX-K.left)*(this.overlayCanvas.width/K.width),Z=(J.clientY-K.top)*(this.overlayCanvas.height/K.height),_=this.findPieceAtPosition(Q,Z);if(_){if(J.preventDefault(),this.activePiece=_,this.isDragging=!0,this.dragStartX=Q,this.dragStartY=Z,this.dragCurrentX=Q,this.dragCurrentY=Z,this.setInitialPiecePosition(_,Q,Z),this.animationFrameId===null)this.animationFrameId=requestAnimationFrame(this.animateDrag.bind(this));document.addEventListener("mousemove",this.onDocumentMouseMove.bind(this)),document.addEventListener("mouseup",this.onDocumentMouseUp.bind(this))}}onDocumentMouseMove(J){if(this.isDragging&&this.activePiece){let K=this.overlayCanvas.getBoundingClientRect();document.body.style.cursor="grabbing",this.dragCurrentX=(J.clientX-K.left)*(this.overlayCanvas.width/K.width),this.dragCurrentY=(J.clientY-K.top)*(this.overlayCanvas.height/K.height)}}onDocumentMouseUp(J){if(this.isDragging&&this.activePiece){let K=j.cellSize,Q=this.activePiece.shape[0].length,Z=this.activePiece.shape.length,_=this.activePiece.x,$=this.activePiece.y,E=Math.floor((_+K/2)/K),V=Math.floor(($+K/2)/K);if(V>=0&&V+Z<=j.gridSize&&E>=0&&E+Q<=j.gridSize)this.tryPlacePiece(E,V);else this.repositionAvailablePieces();document.body.style.cursor="default",this.isDragging=!1,this.activePiece=null,this.overlayCtx.clearRect(0,0,this.overlayCanvas.width,this.overlayCanvas.height),A(this.overlayCtx,this.availablePieces),document.removeEventListener("mousemove",this.onDocumentMouseMove.bind(this)),document.removeEventListener("mouseup",this.onDocumentMouseUp.bind(this))}}onCanvasTouchStart(J){if(J.touches.length>0){let K=this.overlayCanvas.getBoundingClientRect(),Q=J.touches[0],Z=(Q.clientX-K.left)*(this.overlayCanvas.width/K.width),_=(Q.clientY-K.top)*(this.overlayCanvas.height/K.height),$=this.findPieceAtPosition(Z,_);if($){if(J.preventDefault(),this.activePiece=$,this.isDragging=!0,this.dragStartX=Z,this.dragStartY=_,this.dragCurrentX=Z,this.dragCurrentY=_,this.setInitialPiecePosition($,Z,_),this.animationFrameId===null)this.animationFrameId=requestAnimationFrame(this.animateDrag.bind(this));document.addEventListener("touchmove",this.onDocumentTouchMove.bind(this),{passive:!1}),document.addEventListener("touchend",this.onDocumentTouchEnd.bind(this))}}}onDocumentTouchMove(J){if(J.touches.length>0&&this.isDragging&&this.activePiece){J.preventDefault();let K=J.touches[0],Q=this.overlayCanvas.getBoundingClientRect();this.dragCurrentX=(K.clientX-Q.left)*(this.overlayCanvas.width/Q.width),this.dragCurrentY=(K.clientY-Q.top)*(this.overlayCanvas.height/Q.height)}}onDocumentTouchEnd(J){if(this.isDragging&&this.activePiece){let K=j.cellSize,Q=this.activePiece.shape[0].length,Z=this.activePiece.shape.length,_=this.activePiece.x,$=this.activePiece.y,E=Math.floor((_+K/2)/K),V=Math.floor(($+K/2)/K);if(V>=0&&V+Z<=j.gridSize&&E>=0&&E+Q<=j.gridSize)this.tryPlacePiece(E,V);else this.repositionAvailablePieces();this.isDragging=!1,this.activePiece=null,this.overlayCtx.clearRect(0,0,this.overlayCanvas.width,this.overlayCanvas.height),A(this.overlayCtx,this.availablePieces),document.removeEventListener("touchmove",this.onDocumentTouchMove.bind(this)),document.removeEventListener("touchend",this.onDocumentTouchEnd.bind(this))}}activateChallengeMode(){this.isChallengeMode=!0,this.grid.setChallengeMode(!0),this.grid.render()}completeChallengeMode(){this.score+=this.challengeBonusPoints,L(this.score),this.grid.score=this.score,this.isChallengeMode=!1,this.grid.setChallengeMode(!1),this.generateInitialPieces(),this.grid.render(),this.overlayCtx.clearRect(0,0,this.overlayCanvas.width,this.overlayCanvas.height),A(this.overlayCtx,this.availablePieces)}checkChallengeCompletion(){if(this.availablePieces.filter((K)=>K.isAvailable).length===0)this.completeChallengeMode()}}class B extends HTMLElement{selectEl;buttonEl;gameState;constructor(){super();this.attachShadow({mode:"open"});let J=document.createElement("div");J.className="test-scenarios-container",this.selectEl=document.createElement("select"),this.selectEl.id="test-scenario-select";let K=document.createElement("option");K.value="",K.textContent="Select a test scenario",this.selectEl.appendChild(K),Object.entries(T).forEach(([Z,_])=>{let $=document.createElement("option");$.value=Z,$.textContent=_.name,this.selectEl.appendChild($)}),this.buttonEl=document.createElement("button"),this.buttonEl.id="load-scenario-btn",this.buttonEl.textContent="Load Scenario",this.buttonEl.addEventListener("click",this.handleLoadScenario.bind(this));let Q=document.createElement("style");Q.textContent=`
            .test-scenarios-container {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 10px 0;
                gap: 10px;
            }
            
            select {
                padding: 8px;
                border-radius: 4px;
                border: 1px solid #ccc;
                background-color: white;
                font-family: inherit;
                font-size: 14px;
            }
            
            button {
                padding: 8px 12px;
                background-color: var(--button-background, #BE9B7B);
                color: var(--button-text, #2A2723);
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
                transition: background-color 0.2s;
            }
            
            button:hover {
                background-color: var(--button-hover, #D4AF91);
            }
        `,J.appendChild(this.selectEl),J.appendChild(this.buttonEl),this.shadowRoot.appendChild(Q),this.shadowRoot.appendChild(J)}setGameState(J){this.gameState=J}handleLoadScenario(){if(!this.gameState)return;let J=this.selectEl.value;if(J)this.gameState.newGame(J)}static isTestModeEnabled(){return new URLSearchParams(window.location.search).has("testmode")}}class m extends HTMLElement{menuButton;scoreElement;constructor(){super();this.attachShadow({mode:"open"});let J=document.createElement("style");J.textContent=`
            :host {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-bottom: 10px;
                border-bottom: 1px solid var(--border-color, #53493F);
                width: 100%;
            }
            
            h1 {
                color: var(--text-color, #D4AF91);
                margin: 0;
                font-size: 18px;
                font-weight: 400;
                font-family: var(--font-family);
            }
            
            .score-container {
                font-size: 18px;
                color: var(--text-color, #D4AF91);
                display: flex;
                justify-content: center;
                align-items: center;
                font-weight: 400;
            }
            
            .menu-button-container {
                display: flex;
                justify-content: flex-end;
                align-items: center;
            }
            
            .menu-button {
                background: transparent;
                border: none;
                cursor: pointer;
                color: var(--text-color, #D4AF91);
                font-size: 1.6rem;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 5px;
                transition: transform 0.2s;
            }
            
            .menu-button:hover {
                transform: scale(1.1);
            }
            
            .header-content {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                align-items: center;
                width: 100%;
                padding: 0.5rem 0;
            }
        `;let K=document.createElement("div");K.className="header-content";let Q=document.createElement("h1");Q.textContent="Lastblock";let Z=document.createElement("div");Z.className="score-container",this.scoreElement=document.createElement("span"),this.scoreElement.id="score",this.scoreElement.textContent="0",Z.innerHTML="Score: ",Z.appendChild(this.scoreElement);let _=document.createElement("div");_.className="menu-button-container",this.menuButton=document.createElement("button"),this.menuButton.className="menu-button",this.menuButton.innerHTML="&#9776;",this.menuButton.setAttribute("aria-label","Open Information"),this.menuButton.addEventListener("click",this.handleMenuClick.bind(this)),_.appendChild(this.menuButton),K.appendChild(Q),K.appendChild(Z),K.appendChild(_),this.shadowRoot.appendChild(J),this.shadowRoot.appendChild(K),document.addEventListener("score-updated",this.handleScoreUpdate.bind(this))}handleMenuClick(){let J=new CustomEvent("toggle-info-screen",{bubbles:!0,composed:!0});this.dispatchEvent(J)}handleScoreUpdate(J){if(J.detail&&typeof J.detail.score==="number")this.scoreElement.textContent=J.detail.score.toString()}connectedCallback(){document.dispatchEvent(new CustomEvent("request-score-update"))}getScoreElement(){return this.scoreElement}}class S extends HTMLElement{isVisible=!1;container;tabButtons=[];tabContents=[];activeTab=0;constructor(){super();this.attachShadow({mode:"open"});let J=document.createElement("style");J.textContent=`
            :host {
                display: block;
                width: 100%;
            }
            
            .info-container {
                background-color: var(--container-background, #2A2723);
                border: 1px solid var(--border-color, #53493F);
                border-radius: 8px;
                padding: 0;
                margin: 10px 0;
                color: var(--text-color, #D4AF91);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.3s ease-out, opacity 0.3s ease;
                opacity: 0;
                width: 100%;
            }
            
            .info-container.visible {
                max-height: 500px;
                opacity: 1;
                padding: 0;
            }
            
            .tabs {
                display: flex;
                border-bottom: 1px solid var(--border-color, #53493F);
            }
            
            .tab-button {
                background: transparent;
                border: none;
                color: var(--text-color, #D4AF91);
                padding: 12px 20px;
                cursor: pointer;
                font-size: 16px;
                opacity: 0.7;
                transition: opacity 0.2s, background-color 0.2s;
                flex: 1;
            }
            
            .tab-button:hover {
                background-color: rgba(255, 255, 255, 0.05);
            }
            
            .tab-button.active {
                opacity: 1;
                border-bottom: 2px solid var(--color-teal, #3D8C9E);
            }
            
            .tab-content {
                display: none;
                padding: 20px;
            }
            
            .tab-content.active {
                display: block;
            }
            
            h2 {
                color: var(--text-color, #D4AF91);
                margin-top: 0;
                margin-bottom: 12px;
                border-bottom: 1px solid var(--border-color, #53493F);
                padding-bottom: 8px;
            }
            
            p {
                margin-bottom: 12px;
                line-height: 1.5;
            }
            
            .close-button {
                background-color: var(--button-background, #BE9B7B);
                color: var(--button-text, #2A2723);
                border: none;
                padding: 8px 16px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
                margin-top: 10px;
                transition: background-color 0.2s;
                font-weight: bold;
            }
            
            .close-button:hover {
                background-color: var(--button-hover, #D4AF91);
            }
            
            .setting-group {
                margin-bottom: 20px;
            }
            
            .setting-group h3 {
                margin-bottom: 8px;
                font-size: 18px;
                font-weight: normal;
            }
            
            .setting-option {
                display: flex;
                align-items: center;
                margin-bottom: 8px;
            }
            
            .setting-option input {
                margin-right: 8px;
            }
            
            .setting-option label {
                cursor: pointer;
            }
        `,this.container=document.createElement("div"),this.container.className="info-container";let K=document.createElement("div");K.className="tabs";let Q=document.createElement("button");Q.className="tab-button active",Q.textContent="How to Play",Q.addEventListener("click",()=>this.switchTab(0)),this.tabButtons.push(Q);let Z=document.createElement("button");Z.className="tab-button",Z.textContent="Settings",Z.addEventListener("click",()=>this.switchTab(1)),this.tabButtons.push(Z),K.appendChild(Q),K.appendChild(Z);let _=document.createElement("div");_.className="tab-content active";let $=document.createElement("p");$.textContent="Drag and drop blocks onto the grid. Complete rows or columns to clear them and score points. Game over when no more pieces can be placed.";let E=document.createElement("p");E.textContent="Clear multiple lines at once for a bigger bonus!",_.appendChild($),_.appendChild(E),this.tabContents.push(_);let V=document.createElement("div");V.className="tab-content";let q=document.createElement("div");q.className="setting-group";let O=document.createElement("h3");O.textContent="Theme",q.appendChild(O);let M=this.createSettingOption("theme","default","Default",!0),U=this.createSettingOption("theme","dark","Dark");q.appendChild(M),q.appendChild(U),V.appendChild(q);let D=document.createElement("div");D.className="setting-group";let w=document.createElement("h3");w.textContent="Sound",D.appendChild(w);let X=this.createSettingOption("sound","on","On",!0),Y=this.createSettingOption("sound","off","Off");D.appendChild(X),D.appendChild(Y),V.appendChild(D),this.tabContents.push(V);let I=document.createElement("button");I.className="close-button",I.textContent="Close",I.addEventListener("click",this.toggle.bind(this)),this.container.appendChild(K),this.container.appendChild(_),this.container.appendChild(V),this.container.appendChild(I),this.shadowRoot.appendChild(J),this.shadowRoot.appendChild(this.container),document.addEventListener("toggle-info-screen",this.toggle.bind(this))}toggle(){if(this.isVisible=!this.isVisible,this.isVisible)this.container.classList.add("visible");else this.container.classList.remove("visible")}switchTab(J){this.tabButtons.forEach((K,Q)=>{if(Q===J)K.classList.add("active");else K.classList.remove("active")}),this.tabContents.forEach((K,Q)=>{if(Q===J)K.classList.add("active");else K.classList.remove("active")}),this.activeTab=J}createSettingOption(J,K,Q,Z=!1){let _=document.createElement("div");_.className="setting-option";let $=document.createElement("input");$.type="radio",$.id=`${J}-${K}`,$.name=J,$.value=K,$.checked=Z;let E=document.createElement("label");return E.htmlFor=`${J}-${K}`,E.textContent=Q,_.appendChild($),_.appendChild(E),_}show(){this.isVisible=!0,this.container.classList.add("visible")}hide(){this.isVisible=!1,this.container.classList.remove("visible")}}class b{canvas;ctx;messages=[];animationFrameId=null;constructor(J){this.canvas=J,this.ctx=J.getContext("2d"),document.addEventListener("game-toast",this.onToastEvent.bind(this))}onToastEvent(J){let{message:K,type:Q="info"}=J.detail;if(!K)return;if(this.messages.push({text:K,type:Q,opacity:1,timestamp:Date.now()}),this.animationFrameId===null)this.animationFrameId=requestAnimationFrame(this.render.bind(this))}render(){let J=Date.now(),K=500,Q=1500;if(this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.messages=this.messages.filter((Z)=>{return J-Z.timestamp<1500}),this.messages.forEach((Z,_)=>{let $=J-Z.timestamp;if($>500){let V=($-500)/1000;Z.opacity=1-V}this.renderMessage(Z,_)}),this.messages.length>0)this.animationFrameId=requestAnimationFrame(this.render.bind(this));else this.animationFrameId=null}renderMessage(J,K){let Q=this.ctx;Q.save();let Z=this.canvas.height*0.4,_=this.canvas.width/2;switch(Q.globalAlpha=J.opacity,Q.textAlign="center",Q.textBaseline="middle",J.type){case"challenge":Q.fillStyle="#FFD700",Q.font="900 38px 'Source Sans 3'",Q.shadowColor="rgba(0,0,0,0.7)";break;case"bonus":Q.fillStyle="#4CAF50",Q.font="900 38px 'Source Sans 3'",Q.shadowColor="rgba(0,0,0,0.7)";break;default:Q.fillStyle="#FFFFFF",Q.font="900 34px 'Source Sans 3'",Q.shadowColor="rgba(0,0,0,0.5)"}Q.shadowBlur=8,Q.shadowOffsetX=2,Q.shadowOffsetY=2,Q.fillText(J.text,_,Z-K*40),Q.restore()}static showToast(J,K="info"){document.dispatchEvent(new CustomEvent("game-toast",{detail:{message:J,type:K},bubbles:!0,composed:!0}))}}customElements.define("game-header",m);customElements.define("info-screen",S);customElements.define("test-mode-ui",B);window.addEventListener("DOMContentLoaded",()=>{let J=new C,K=document.getElementById("toast-canvas"),Q=new b(K);if(J.initialize(),B.isTestModeEnabled()){let Z=document.getElementById("test-mode-container");if(Z){let _=document.createElement("test-mode-ui");Z.appendChild(_),_.setGameState(J)}}L(0)});
