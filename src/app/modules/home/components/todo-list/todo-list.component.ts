
import { Component, DoCheck, OnInit } from '@angular/core';

//Interface
import { TaskList } from './../../model/task-list';
import { first, last } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent  implements OnInit,DoCheck{

  /*
  public taskList: Array<TaskList> = [
    {task:"Minha nova Task 1",checked:true},
    {task:"Minha nova Task 2",checked:false}
];
*/

  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || '[]');

  constructor(){}

  ngDoCheck(): void {
    this.setLocalStorage();
  }

  ngOnInit(): void {

  }

  public deleteItemTaskList(event: number){
    return this.taskList.splice(event,1);
  }

  public deleteAllTaskList(){
    const confirm = window.confirm("Você deseja realmente deletar tudo?");

    if (confirm){
      this.taskList = [];
    }
  }

  public setEmitTaskList(event: string)
  {
    //console.log(event);
    this.taskList.push({ task: event, checked: false });

  }

  public validationInput (event: string, index : number){

    if(!event.length){
      const confirm =  window.confirm("Task está vazia, deseja cadastrar?")

      if(confirm){
        this.deleteItemTaskList(index);
      }
    }

  }

  public setLocalStorage(){
    if (this.taskList){
      this.taskList.sort((first,last)=> Number(first.checked) - Number(last.checked) );
      localStorage.setItem("list", JSON.stringify(this.taskList));
    }
  }
}
