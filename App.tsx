import { Component } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CronometroState {
  numero: number;
  btnStart: string;
  ultimo: number | null;
}
class Cronometro extends Component<{}, CronometroState>{
  timer: NodeJS.Timeout | null = null;

  constructor(props: {}){
    super(props);
    this.state={
      numero: 0,
      btnStart: 'START',
      ultimo: null
    }

    this.iniciar = this.iniciar.bind(this);
    this.reset = this.reset.bind(this);
  }

  iniciar(){
    if(this.timer != null){
      clearInterval(this.timer);
      this.timer = null;
      this.setState({btnStart: 'START'})
    } else{
      this.timer = setInterval( () => {
        this.setState({numero: this.state.numero + 0.1})
      }, 100);
      this.setState({btnStart: 'PARAR'})
    }
  }

  reset(){
    if (this.timer != null){
      clearInterval(this.timer);
      this.timer = null;
    }
    this.setState({
      ultimo: this.state.numero,
      btnStart: 'START',
      numero: 0
    })

    }
  
  render(){
    return(
      <View style={customize.container}>
        <Image
          source={require('./assets/cronometro.png')}
          style={customize.cronometro}
        />
        <Text style={customize.timer}>
          {this.state.numero.toFixed(2)}
        </Text>
        <View style={customize.btnArea}>
          <TouchableOpacity style={customize.btn}>
            <Text style={customize.btnTexto} onPress={this.iniciar}>INICIAR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={customize.btn}>
            <Text style={customize.btnTexto} onPress={this.reset}>RESET</Text>
          </TouchableOpacity>
        </View>
        <View style={customize.ultArea}>
          <Text style={customize.ultTxt}>Último tempo: {this.state.ultimo} </Text>
        </View>
      </View>
    )
  }
}

const customize = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00aeef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cronometro: {
    width: 150,
    height: 180
  },
  timer: {
    marginTop: -110,
    color: '#fff',
    fontSize: 45,
    fontWeight: 'bold'
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 70,
    height: 40
  },
  btn:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: 40,
    width: 120,
    margin: 15,
    borderRadius: 9
  },
  btnTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef'
  },
  ultArea: {
    marginTop: 40
  },
  ultTxt:  {
    fontSize: 25,
    fontStyle: 'italic',
    color: '#FFF'
  }
    
})

export default Cronometro;