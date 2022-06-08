class AuthController {
    static login = async (req, res) => {
        return res.render('admin/login');
    }
    
}

module.exports = AuthController