import React from 'react'

import Square from './Square'

const keyz = [8,1,6,3,5,7,4,9,2];
const key  = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
let playerTurn = true;
let someonesWon = false;


export default class Grid extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      masterArray: [0,0,0,0,0,0,0,0,0],
      someonesWon: false
    }
    this.changeSquare = this.changeSquare.bind(this);
    this.playerFunc = this.playerFunc.bind(this);
    this.aiFunc = this.aiFunc.bind(this);
    this.checkWin = this.checkWin.bind(this);
    this.tests = this.tests.bind(this);
    this.playAgain = this.playAgain.bind(this);
    this.shitFunc = this.shitFunc.bind(this);
  }

  testForWin(arr){
    for(var i=0;i<8;i++){
      let twos = arr[i].filter((elem) => elem==2)
      let zeros = arr[i].filter((elem) => elem==0)
      if(twos.length==2 && zeros.length==1){
        return [i,arr[i].indexOf(0)]
  }}}
  testForBlock(arr){
    for(var i=0;i<8;i++){
      let ones = arr[i].filter((elem) => elem==1)
      let zeros = arr[i].filter((elem) => elem==0)
      if(ones.length==2 && zeros.length==1){
        return [i,arr[i].indexOf(0)]
  }}}
  testForChance(arr){
    for(var i=0;i<8;i++){
      let twos = arr[i].filter((elem) => elem==2)
      let zeros = arr[i].filter((elem) => elem==0)
      if(twos.length==1 && zeros.length==2){
        return [i,arr[i].indexOf(0)]
  }}}

  tests(arr){
    let doubleIndex = this.testForWin(arr)
    if (doubleIndex){return doubleIndex}
    doubleIndex = this.testForBlock(arr)
    if (doubleIndex){return doubleIndex}
    doubleIndex = this.testForChance(arr)
    if (doubleIndex){return doubleIndex}
  }

  aiFunc(){

    let linesArray = [[],[],[],[],[],[],[],[]];
    for(var i=0;i<8;i++){
      for(var j=0;j<3;j++){
        linesArray[i][j] = this.state.masterArray[key[i][j]];
      }
    }
    let index = this.tests(linesArray)
    console.log(index)
    if (index){
      index = key[index[0]][index[1]]
    }
    else{
      if(this.state.masterArray[4]==0){
        index = 4
      }else{
        index = this.state.masterArray.indexOf(0)
      }
    }
    console.log(index);

    this.changeSquare(2,index)

  }

  playerFunc(p,index){
    if(playerTurn && this.state.masterArray[index]==0){
      playerTurn = false
      this.changeSquare(p,index)
      if(!someonesWon){
        setTimeout(()=>{
          this.aiFunc();
          if(!someonesWon){
            playerTurn = true;
          }
        },500)
      }
    }
  }

  changeSquare(p,index){
    let tempArr = this.state.masterArray;
    tempArr[index] = p;
    this.setState(()=>({masterArray: tempArr}))

    var gog = keyz.filter((element,i) =>
      this.state.masterArray[i] == p  )
    this.checkWin(gog);
  }



  checkWin(n){
    for(var i=0; i<(n.length - 2) ;i++){
      for(var j=i+1; j<(n.length - 1) ;j++){
        for(var k=j+1; k<(n.length) ;k++){

          if(n[i]+n[j]+n[k] == 15){
            let tempArr = this.state.masterArray;
            tempArr[keyz.indexOf(n[i])] += 2;
            tempArr[keyz.indexOf(n[j])] += 2;
            tempArr[keyz.indexOf(n[k])] += 2;
            this.setState(()=>({masterArray:tempArr}))
            someonesWon = true;
            this.setState(()=>({someonesWon:true}))

          }
    }}}
    let foo = this.state.masterArray.filter((elem) => elem==0)
    if(foo.length == 0){
      someonesWon = true;
      this.setState(()=>({someonesWon:true}))
    }
  }

  playAgain(){
    let masterArray = [0,0,0,0,0,0,0,0,0];
    this.setState(()=> ({masterArray}));
    this.setState(()=> ({someonesWon: false}));
    someonesWon = false;
    playerTurn = true;
  }
  shitFunc(){
    console.log(this.state.masterArray);
  }
  render(){
    return (
      <div>
        <h1>O&X</h1>
        <div className="grid">
        <Square name="0" changeSquare={this.playerFunc} squareState={this.state.masterArray[0]}/>
        <Square name="1" changeSquare={this.playerFunc} squareState={this.state.masterArray[1]}/>
        <Square name="2" changeSquare={this.playerFunc} squareState={this.state.masterArray[2]}/>
        <Square name="3" changeSquare={this.playerFunc} squareState={this.state.masterArray[3]}/>
        <Square name="4" changeSquare={this.playerFunc} squareState={this.state.masterArray[4]}/>
        <Square name="5" changeSquare={this.playerFunc} squareState={this.state.masterArray[5]}/>
        <Square name="6" changeSquare={this.playerFunc} squareState={this.state.masterArray[6]}/>
        <Square name="7" changeSquare={this.playerFunc} squareState={this.state.masterArray[7]}/>
        <Square name="8" changeSquare={this.playerFunc} squareState={this.state.masterArray[8]}/>
        </div>
        {this.state.someonesWon && <h2 onClick={this.playAgain}>play again?</h2>}
      </div>
    )
  }
}
