const mainController = {

    // Vista principañ
 
     index: async (req, res) => {
         try {
             return res.render('./main/index.ejs');
         } catch (error) { 
             console.log(error.message); 
         }
     },
     dashboard : async (req, res) => {
        try {
            return res.redirect('http://localhost:3000');
            //return res.redirect('https://dashboard-bem.onrender.com'); //for deplyed web service
        } catch (error) { 
            console.log(error.message); 
        }
    }
}

module.exports = mainController