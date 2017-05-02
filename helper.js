function init() {
    $(".btn-nav").hover(function() {
        $(".dd_animated").css({"display": "block"});    
    });
    
    var promo_list = getPromotionsList();
    console.log(promo_list);
}