
class Camara{

    constructor(videoNode){

        this.videoNode = videoNode;

        console.log('camara inicializada');

    }

    encender(){

        if(navigator.mediaDevices)
        {
            navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    width: 300,
                    height: 300
                }
            }).then(stream=>{
                this.videoNode.srcObject = stream;
                this.stream = stream;
            });
        }
        else{
            console.log('no permite camara');            
        }       

    }

    apagar(){

        this.videoNode.pause();

        if(this.stream){
            this.stream.getTracks()[0].stop();
        }    
    }


    tomarFoto(){

        //crear un elemento canvas para renderizar ahi la foto
        let canvas = document.createElement('canvas');


        //colocar las dimensiones del canvas  como las del video
        canvas.setAttribute('width',300);
        canvas.setAttribute('height',300);


        //obtener le contexto del canvas
        let context = canvas.getContext('2d'); //una imagen

        //dibujar la imagen dentro del canvas
        context.drawImage(this.videoNode, 0 , 0,  canvas.width, canvas.height);

        //extraer la imagen
        this.foto = context.canvas.toDataURL();

        // limpienza
        canvas = null;
        context = null;
        return this.foto;
    }
    
}