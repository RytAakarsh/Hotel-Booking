
// GET /api/user/

export const getUserData = async () => {
    try {
        const role = req.user.role;
        const recentSearchedCities = req.user.recentSearchedCities;
        res.json({success: true, role, recentSearchedCities})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

//Store User Recent Searched Cities 

export const storeRecentSearchedCities = async (req,res) => {
       try {
        const {recentSearchedCities} = req.body;
        const user = await req.user;

        if(user.recentSearchedCities.length < 3){
            user.recentSearchedCities.push(recentSearchedCities);
        }else {
            user.recentSearchedCities.shift();
            user.recentSearchedCities.push(recentSearchedCities);
        }
        await user.save();
        res.json({success: true, message: "City added"})
       } catch (error) {
        res.json({success: false, message: "error.message"})
       }
}