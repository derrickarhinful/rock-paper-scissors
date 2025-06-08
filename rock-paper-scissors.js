 const score = JSON.parse(localStorage.getItem('score')) || {
        wins: 0,
        loses: 0,
        ties: 0
      };
        
      updateScore();
      
       function playerGame(playerMove){
          let result = '';
          computerMove = pickComputerMove();
        if (playerMove === computerMove) {
        result = 'Tie!';
        score.ties += 1;
      } else if (
        (playerMove === 'rock' && computerMove === 'scissors') ||
        (playerMove === 'paper' && computerMove === 'rock') ||
        (playerMove === 'scissors' && computerMove === 'paper')
      ) {
        result = 'You win!';
        score.wins += 1;
      } else {
        result = 'You lose!';
        score.loses += 1;
      }
     
     document.querySelector('.js-moves')
     .innerHTML =` You <img src="images/${playerMove}-emoji.png" class="move-icon"> <img src="images/${computerMove}-emoji.png" class="move-icon">
      Computer`
     document.querySelector('.js-result')
     .innerHTML = `${result}`
     localStorage.setItem('score', JSON.stringify(score));
     updateScore();
    
    }
    document.querySelector('.js-rock-button')
    .addEventListener('click', ()=>{playerGame('rock');
    });

    document.querySelector('.js-paper-button')
    .addEventListener('click',()=>{ playerGame('paper');
    });
    
    document.querySelector('.js-scissors-button')
    .addEventListener('click',()=>{ playerGame('scissors');
    });

    document.querySelector('.js-reset-playbutton')
    .addEventListener('click', ()=>{
      const html = `<div>Are you sure you want to reset?<button class="button" onclick="reset('Yes')">
    Yes</button>
    <button class="button"onclick="reset('No')">No</button>`;
      document.querySelector('.js-reset-confirmation').innerHTML = html;    
    });

    function reset(answer){
      if(answer === 'Yes'){
     score.wins = 0,
     score.loses = 0,
     score.ties = 0 
     updateScore();
    document.querySelector('.js-reset-confirmation').innerHTML = "";
      }else{
        document.querySelector('.js-reset-confirmation').innerHTML = "";
      }
       
    }
    document.querySelector('.js-reset-playbutton')
    .addEventListener('click',()=>{
      if(isAutoPlaying){
        clearInterval(intervalId);
        isAutoPlaying = false;
      }
    })
    let isAutoPlaying = false;
     let intervalId;
     document.querySelector('.js-autoplay-button')
    .addEventListener('click',()=>{
       if(!isAutoPlaying){
      intervalId = setInterval(()=>{
        const playerMove = pickComputerMove();
        playerGame(playerMove);
      },1000)
      isAutoPlaying= true;
     
    }else{
      clearInterval(intervalId);
      isAutoPlaying = false;
    }
    buttons();
    })
   
    
    function updateScore(){
      document.querySelector('.js-score')
      .innerHTML = `Wins: ${score.wins} Loses: ${score.loses} Ties: ${score.ties}`;
    }
    function pickComputerMove(){
        let computerMove= '';
        let result ='';
     const randomNumber = Math.random();
     if(randomNumber  < 1 / 3)
     {computerMove = 'rock'}
     else if ( randomNumber >=1/3 && randomNumber< 2/3)
     {computerMove = 'paper';}
    else{
      computerMove = 'scissors'; 
    }      
      return computerMove;
    }

    function buttons(){
     let buttonElement = document.querySelector(".js-autoplay-button");
     if(buttonElement.innerText === 'AutoPlay'){
      buttonElement.innerText = 'Stop playing';
     }else{
      buttonElement.innerText = 'AutoPlay';
     }
    }