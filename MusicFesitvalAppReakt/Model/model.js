var Realm = require('realm')

const ArtistSchema ={
   name:'Artist', 
   properties:{ 
       name:'string', 
       time:'string', 
       details:{ type:'string', default:''}
   }
};

let realm = new Realm({schema:[ArtistSchema]})

export default realm;