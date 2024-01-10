import { Component, WritableSignal, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment.development';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  //socket = io('http://localhost:3000');
  socket = io('https://chat-unir-back-c04w.onrender.com');
  formulario: FormGroup;

  mensajes: WritableSignal<any[]> = signal([]);
  numClientes: WritableSignal<number> = signal(0);

  constructor() {
    this.formulario = new FormGroup({
      username: new FormControl(),
      message: new FormControl(),
    });
  }

  ngOnInit() {
    this.socket.on('mensaje_chat', (data) => {
      this.mensajes.mutate((value) => value.push(data));
    });

    this.socket.on('clientes_conectados', (data) => {
      this.numClientes.set(data);
    });
  }

  onSubmit() {
    //console.log(this.formulario.value);
    this.socket.emit('mensaje_chat', this.formulario.value);
  }
}
