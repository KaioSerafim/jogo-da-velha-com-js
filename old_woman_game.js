document.addEventListener("DOMContentLoaded", ()=>{
    const blocos = document.querySelectorAll(".block"); //blocos das celulas
    const player = document.querySelector("#player"); 
    const rest = document.querySelector("#Breset");
    const vencedor = document.querySelector("#winner");
    let darkmode = document.querySelector("#bTema");
    let body = document.querySelector("body");

    let jogadas = ['','','','','','','','','']; //onde ficara salvo as jogadas, e serão comparadas com as condições de vitória, dentro de um loop
    let jogador = "X";
    let jogoAtivado = false; // variavel usada para continuar ou encerrar o jogo
    const empate = false;
    let troca = false;
   

    /*  
        lógica do jogo da velha ou index dos blocos
        [0,1,2] representação dos blocos usando index
        [3,5,4]
        [6,7,8] 
    */
     
    const condiçao_win = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
    iniciar()

    function iniciar(){
        blocos.forEach(bloco =>bloco.addEventListener("click",clickCells));//cada bloco terá um evento de click
        rest.addEventListener("click",reiniciar)
        player.textContent = `${jogador}`;
        jogoAtivado =  true;
    }

    function clickCells(){
        const indexBl = this.getAttribute("cellindex"); //guarda o index do bloco clicado
      

        if(jogadas[indexBl] != "" || !jogoAtivado){
            return;
        }
        atualizar(this,indexBl); //parametros que devolve o o bloco clicado e index dele
        Verificar(); //verifica quem é o vencedor da rodada
    }
     
    function atualizar(blocos,index){
        jogadas[index] = jogador; //adiciona ao jogadas o "X" ou "O" na posição certa, usando o paramentro indexBL/index
        blocos.innerHTML = jogador; //escreve na tela o valor jogador.
    }

    function trocar(){
        if(jogador == "X"){
            jogador = "O"
        }else{
            jogador = "X"
        }
        player.innerHTML = jogador
    }
        

    function Verificar(){
        let vitoria = false;

        for(let i = 0; i<=7; i++){
            const acertos = condiçao_win[i];
            let a = jogadas[acertos[0]];
            let b = jogadas[acertos[1]];
            let c = jogadas[acertos[2]];
            console.log(a);
            
             if(a == ""||b== ""||c == ""){
                continue;
            }

            if(a == b && b == c){
                vitoria = true;
                break;
            }
         }

        if(vitoria == true){
            vencedor.innerHTML = `O vencedor é ${jogador}`;    
            jogoAtivado = false;    
        }else if(!jogadas.includes('')){
            vencedor.textContent = `Empate`;
            jogoAtivado = false;
        }else{
            trocar();
        }    
        
    }

   function reiniciar(){
        jogador = "X";
        vencedor.textContent = "";
        blocos.forEach(space => space.textContent = ""); // deixa todos os blocos vazios, usando forEach
        jogadas = ['','','','','','','','','']; //deixando o array no seu estado normal
        jogoAtivado = true;
        player.textContent = `${jogador}`;
    }

    darkmode.addEventListener("click",()=>{
       if(troca == false){
            troca = true;
            body.classList.remove("normal");
            body.classList.add("altMode");
       }else{
            troca = false;
            body.classList.remove("altMode");
            body.classList.add("normal");
        
        }
    })
  
})