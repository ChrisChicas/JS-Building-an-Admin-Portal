let root = document.querySelector("#root");
let ul = document.createElement("ul")
root.append(ul)
const year = new Date().getFullYear();
console.log(typeof(year))

async function main(){
    let response = await fetch('http://localhost:3001/listBooks');
    let booklist = await response.json();
    console.log(typeof(booklist.length))
    booklist.forEach(function(book){
        let list = document.createElement('li');
        list.textContent = book.title

        let input = document.createElement("input")
        input.type = "text"
        input.value = book.quantity

        let savebutton = document.createElement("button")
        savebutton.textContent = "Save"
        savebutton.addEventListener("click", async function(){
            await fetch('http://localhost:3001/updateBook', {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "id": book.id,
                "quantity": input.value
            })
        });
        })

        let delbutton = document.createElement("button")
        delbutton.textContent = "Delete"
        delbutton.addEventListener("click", async function(bookId){
            bookId = book.id
            await fetch(`http://localhost:3001/removeBook/${bookId}`, {
            method: "DELETE"
        });
            list.remove()
        })

        list.append(input, savebutton, delbutton)
        ul.append(list);

        
    })
    let form = document.createElement("form")
    let legend = document.createElement("legend")
    legend.textContent = "Add Books"
    form.append(legend)
    root.append(form)

    let titlelabel = document.createElement("label")
    titlelabel.textContent = "Book Title"

    let titleinput = document.createElement("input")
    titleinput.type = "text"

    let desclabel = document.createElement("label")
    desclabel.textContent = "Book Description"

    let descinput = document.createElement("input")
    descinput.type = "text"

    let urllabel = document.createElement("label")
    urllabel.textContent = "Book Image URL"

    let urlinput = document.createElement("input")
    urlinput.type = "text"

    let submitbutton = document.createElement("button")
    submitbutton.textContent = "Submit"
    submitbutton.addEventListener("click", async function(){
        await fetch('http://localhost:3001/addBook', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "id": booklist.length + 1,
                "title": `${titleinput.value}`,
                "year": year,
                "description": `${descinput.value}`,
                "quantity": 9,
                "imageURL": `${urlinput.value}`
            })
        })
    })
    form.append(titlelabel, titleinput, desclabel, descinput, urllabel, urlinput, submitbutton)
}
main()