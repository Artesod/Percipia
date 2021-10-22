package main

import(
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	

	_ "github.com/go-sql-driver/mysql"
	"github.com/rs/cors"   
)

type todoList struct{
	ID			int
	Description string
	Date        string
	Time        string

}

var db *sql.DB
var err error

func dbInit() {
	fmt.Println("Drivers: ", sql.Drivers())

	db, err = sql.Open("mysql", "root:root@tcp(127.0.0.1:3306)/todoList")

	if err != nil{
		panic(err.Error())
	}

	err = db.Ping()
	if err != nil{
		fmt.Println("Error")
		panic(err.Error())
	}

	tx, err := db.Begin()
	if err != nil{
		panic(err.Error())
	}

	_, err = tx.Exec("CREATE DATABASE IF NOT EXISTS todoList")
	if err != nil{
		panic(err.Error())
	}

	_, err = tx.Exec("USE todoList")
	if err != nil{
		panic(err.Error())
	}

	query := `CREATE TABLE IF NOT EXISTS todoListTable (
		ID INT NOT NULL PRIMARY KEY,
		Description VARCHAR(20) NOT NULL,
		Date VARCHAR(20) NOT NULL,
		Time VARCHAR(20) NOT NULL 
	)`

	_, err = tx.Exec(query)
	if err != nil{
		panic(err.Error())
	}

	err = tx.Commit()
	if err != nil{
		panic(err.Error())
	}

	fmt.Println("Connected to Database")

}

func dbAddNewItem(Description string, Date string, Time string, ID int) error {
	tx, err := db.Begin()
	if err != nil{
		panic(err.Error())
	}

	_, err = tx.Exec(`INSERT INTO todoListTable (ID, Description, Date, Time)
	VALUES(?,?,?,?) `, ID, Description, Date, Time)
	if err != nil{
		panic(err.Error())
	}

	err = tx.Commit()
	if err != nil{
		panic(err.Error())
	}
	return nil
}

func dbRemoveItem(ID int) error {

	tx, err := db.Begin()
	if err != nil{
		panic(err.Error())
	}

	_, err = tx.Exec(`DELETE FROM todoListTable WHERE ID = ? `, ID)
	if err != nil{
		panic(err.Error())
	}

	err = tx.Commit()
	if err != nil{
		panic(err.Error())
	}
	return nil
}

func dbUpdateItem(Description string, Date string, Time string, ID int) error {
	tx, err := db.Begin()
	if err != nil{
		panic(err.Error())
	}

	_, err = tx.Exec(`UPDATE todoListTable SET Description = ?, Date = ?, Time = ? WHERE ID = ? `, Description, Date, Time, ID)
	if err != nil{
		panic(err.Error())
	}

	err = tx.Commit()
	if err != nil{
		panic(err.Error())
	}
	return nil
}

func dbGetList() ([]todoList, error){

	tb, err := db.Query(`SELECT * FROM todoListTable ORDER BY Date, Time`)

	defer tb.Close()
	if err != nil{
		panic(err.Error())
	}

	var items []todoList
	
	for tb.Next(){
		var item todoList
		
		if err := tb.Scan(&item.ID, &item.Description, &item.Date, &item.Time); err != nil {
			return items, err
		}
		items = append(items, item)
	}

	if err = tb.Err(); err != nil {
		return items, err
	}

	return items, err
}

func getListHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	payload,err  := dbGetList()

	if err != nil{
		panic(err.Error())
	}
	json.NewEncoder(w).Encode(payload)
	
}

func addNewItemHandler(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content_Type")

	var task todoList
	json.NewDecoder(r.Body).Decode(&task)
	dbAddNewItem(task.Description, task.Date, task.Time, task.ID)
	json.NewEncoder(w).Encode(task)
}

func removeItemHandler(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content_Type")
	
	var task todoList
	err := json.NewDecoder(r.Body).Decode(&task)
	if err != nil{
		panic(err.Error())
	}
	dbRemoveItem(task.ID)
	json.NewEncoder(w).Encode(task)
}

func updateItemHandler(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content_Type")

	var task todoList
	json.NewDecoder(r.Body).Decode(&task)

	dbUpdateItem(task.Description, task.Date, task.Time, task.ID)
	json.NewEncoder(w).Encode(task)
}

func main()  {
	dbInit()
	defer db.Close()


	mux:= http.NewServeMux()
	mux.HandleFunc("/getList", getListHandler)
	mux.HandleFunc("/addItem", addNewItemHandler)
	mux.HandleFunc("/removeItem", removeItemHandler)
	mux.HandleFunc("/updateItem", updateItemHandler)

	handler := cors.Default().Handler(mux)
	log.Println("Server has started -> http://localhost:8080/")
	log.Fatal(http.ListenAndServe(":8080", handler))
}	