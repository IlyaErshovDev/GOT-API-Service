 export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

   getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };
    getAllCharacters = async () => {
        const res = await this.getResource('/characters?page=5&pageSize=10');
        // console.log(res);
        return res.map(this._transformCharacter.bind(this))
    }
    getCharacter = async (id) => {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    getAllBooks = async () => {
        const books = await this.getResource('/books/');
        return books.map(this._transformBook.bind(this));
    }
    getBook = async (id)  => {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }

    getAllHouses = async () => {
        const houses = await this.getResource('/houses/');
        return houses.map(this._transformHouse.bind(this));
    }
    getHouse = async (id) =>  {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house);
    }

    checkData = (prop) => {
        return prop=== '' ? prop = 'No Data' : prop; 
    }

    _transformCharacter(char) {
      
        return {
            id: parseInt(this.checkData(char.url).match(/\d+/)),
            name:  this.checkData(char.name),
            gender:  this.checkData(char.gender),
            born:  this.checkData(char.born),
            died:  this.checkData(char.died),
            culture:  this.checkData(char.culture) 
        }
    }

    _transformHouse(house) {
        return {
            name:  this.checkData(house.name),
            region:  this.checkData(house.region),
            words:  this.checkData(house.words),
            titles:  this.checkData(house.titles),
            overlord:  this.checkData(house.overlord),
            ancestralWeapons:  this.checkData(house.ancestralWeapons)
        }
    }


    _transformBook(book) {
        return {
            name:  this.checkData(book.name), 
            numberOfPages:  this.checkData(book.numberOfPages),
            publisher:  this.checkData(book.publisher),
            released:  this.checkData(book.released)
        }
    }
}



  