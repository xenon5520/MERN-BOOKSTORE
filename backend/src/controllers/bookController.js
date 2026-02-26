import Book from "../models/bookModel.js"
export async function getAllBooks(_,res){
    try {
        const books = await Book.find().sort({ createdAt: -1})
        res.status(200).json(books)
    } catch (error) {
        console.log("Error in getAllBook controller", error)
        res.status(500).json({message: "Internal server erroe"})
    }
}
export async function getBookId(req,res){
    try {
        const book = await Book.findById(req.params.id)
        if(!book) return res.status(404).json({message:"Book not Found"})
        res.status(200).json(book)
    } catch (error) {
        console.log("erroe in getBookById controller",error)
        res.status(200).json({message:"Internal server error"})
    }
}
export async function createBook(req,res){ 
   try {
    const { title, author, publishYear } = req.body
    if(!title || !author || !publishYear){
        return res.status(404),json({message: 'All field are required'})
    }
    const book = new Book({title, author, publishYear})
    const saveBook = await book.save()
    res.status(201).json({ saveBook })
   } catch (error) {
    console.log("Error in createBook controller",error)
    res.status(500).json({ message: "Internal server error"})
   }
}
export async function updateBook(req,res){
   try {
    const {title,author,publishYear} = req.body
    const updateBook = await
    Book.findByIdAndUpdate(req.params.id, {title,author,publishYear}, {new:true})
    if(!updateBook) return res.status(404).json({message: " Book not found"})
        res.status(200).json(updateBook)
   } catch (error) {
    console.log("Error inm update book", error)
    res.status(500).json({message:"Internal server error"})
   }
}
export async function deleteBook(req,res){
    try {
        const deletedBook = await
        Book.findByIdAndDelete(req.params.id)
        if(!deleteBook) return res.status(404).json({message: "Book not found"})
            res.status(200).json({message:"Book deletded succesfully"})
    } catch (error) {
        console.log("Error in deletedBook controller",error)
        res.status(500).json({message:"Internal server Error"})
    }
}