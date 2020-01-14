import { Component } from '@angular/core';
import { Todo } from './model/todo.model';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public todos : Todo[] = [];
  public title: String = 'Titulo legalzinho para a aplicação';
  public form: FormGroup;
  

  constructor(private fb : FormBuilder){
    
    this.form = this.fb.group({
      title : ['', Validators.compose([
      Validators.minLength(3),
      Validators.maxLength(60),
      Validators.required

    ])]    
    });
    
    //this.todos.push(new Todo(1, 'Era para ser um teste', false));
    //this.todos.push(new Todo(2, 'Era para ser um teste do teste que ja foi criado', false));
    //this.todos.push(new Todo(3, 'Este é outro teste dos testes que ja foram criados', true));
  }
  
 add(){
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clear();
 }

 save(){
   const data = JSON.stringify(this.todos);
   localStorage.setItem('todos', data);
 }

 load(){
    
 }


 clear(){
   this.form.reset();
 }
  
  remove(todo : Todo){
    const index = this.todos.indexOf(todo);
    if(index !== -1){
      this.todos.splice(index, 1);
    }
  }

  markAsDone(todo: Todo){
    todo.done = true;
  }

  markAsUnDone(todo: Todo){
    todo.done = false;
  }



}
