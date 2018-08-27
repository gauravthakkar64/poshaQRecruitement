# poshaQRecruitement
Recruitment Process for year 2018

## To-Do List:-


* To start sever:-
  ##### npm start
  
* All APIs:-
  ```
  1. localhost:3000/create_label
  ```
  Add data in following JSON format:-
  
  ```
  {
	"name":"To-Do",
	"tasks":[]
  }
  ```
  ```
   2. localhost:3000/delete_label/<LableName>
  ```
  ```
  3. localhost:3000/update_label/<LableName>
  ```
  Add data in following JSON format:-
  
  ```
  {
	"name":"<LableName>"
  }
  ```
  ```
  4. localhost:3000/create_task
  ```
  Add data in following JSON format:-
  
  ```
  {
	"name":"<Task Name>",
	"description":" <Task Description>",
	"status":"<LableName>"	
  }
  ```
  ```
  5. llocalhost:3000/delete_task/<TaskName>
  ```
  ```
  6. localhost:3000/update_task/<TaskName>
  ```
  Add data in following JSON format:-
  
  ```
  {
	"description":"<Task Description>"
  }
  ```
  ```
  7. localhost:3000/move_task/<Task_Name_To_Move>
  ```
  Add data in following JSON format:-
  
  ```
  {
	"status":"<Task_New_Status>"
  }
  ```
  
  ### All Endpoints are tested using the postman for proper work flow.
  
  
  **NOTE:- Database dump is not provided.
  
 
  
 
