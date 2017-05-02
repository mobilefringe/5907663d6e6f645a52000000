function renderBanner(banner_template,home_banner,banners){
    var item_list = [];
    var item_rendered = [];
    var banner_template_html = $(banner_template).html();
    Mustache.parse(banner_template_html);   // optional, speeds up future uses
    $.each( banners , function( key, val ) {
        today = new Date();
        start = new Date (val.start_date);
        start.setDate(start.getDate());
        if(val.url == "" || val.url === null){
            val.css = "style=cursor:default;";
            val.noLink = "return false";
        }
        if (start <= today){
            if (val.end_date){
                end = new Date (val.end_date);
                end.setDate(end.getDate() + 1);
                if (end >= today){
                    item_list.push(val);  
                }
            } else {
                item_list.push(val);
            }
        }
    });
    $.each( item_list , function( key, val ) {
        var repo_rendered = Mustache.render(banner_template_html,val);
        item_rendered.push(repo_rendered);
    });
    $(home_banner).html(item_rendered.join(''));
}

function renderEvents(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        if (val.eventable_type == "Store") {
            var store_details = getStoreDetailsByID(val.eventable_id);
            val.store_detail_btn = store_details.slug ;
            val.store_name = store_details.name;
            val.image_url = "background-image: url(" + store_details.store_front_url_abs + ");";
        }
        else{
            val.store_name = "Lansdowne Place";
            val.image_url = "background-image: url(" + val.event_image_url_abs + ");"; 
        }
        
        if(val.image_url.indexOf('missing.png') > 0){
            val.image_url  = "background-image: url(//codecloud.cdn.speedyrails.net/sites/58f66c9b6e6f647d46000000/image/jpeg/1492633527000/img_default.jpg);";
        }
        var show_date = moment(val.show_on_web_date);
        var start = moment(val.start_date).tz(getPropertyTimeZone());
        var end = moment(val.end_date).tz(getPropertyTimeZone());
        if (start.format("DMY") == end.format("DMY")){
            val.dates = start.format("MMM D")
        }
        else{
            val.dates = "STARTS " + start.format("MMM D") + " - ENDS " + end.format("MMM D")
        }
        
        if (val.description.length  >= 190) {
            val.description = val.description.substring(0, 189) + "...";
        }
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderEventDetails(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    item_list.push(collection);
    $.each( item_list , function( key, val ) {
        if (val.eventable_type == "Store") {
            var store_details = getStoreDetailsByID(val.eventable_id);
            val.store_detail_btn = store_details.slug;
            val.store_name = store_details.name;
            if (store_details.store_front_url_abs.indexOf('missing.png') > -1){
                val.image_url = "//codecloud.cdn.speedyrails.net/sites/58f66c9b6e6f647d46000000/image/jpeg/1492633527000/img_default.jpg";
            }
            else{
                val.image_url = store_details.store_front_url_abs;
            }
        } else {
            val.store_name = "Lansdowne Place";
            val.image_url = val.event_image_url_abs; 
        }
        
        if(val.image_url.indexOf('missing.png') > 0){
            val.image_url  = "//codecloud.cdn.speedyrails.net/sites/58f66c9b6e6f647d46000000/image/jpeg/1492633527000/img_default.jpg";
        }
        
        var show_date = moment(val.show_on_web_date);
        var start = moment(val.start_date).tz(getPropertyTimeZone());
        var end = moment(val.end_date).tz(getPropertyTimeZone());
        if (start.format("DMY") == end.format("DMY")){
            val.dates = start.format("MMM D");
        }
        else{
            val.dates = "STARTS " + start.format("MMM D") + " - ENDS " + end.format("MMM D");
        }
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderEventSingle(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    
    var show_date = moment(collection.show_on_web_date);
    var start = moment(collection.start_date).tz(getPropertyTimeZone());
    var end = moment(collection.end_date).tz(getPropertyTimeZone());
    if (start.format("DMY") == end.format("DMY")){
        collection.dates = start.format("MMM D");
    }
    else{
        collection.dates = "STARTS " + start.format("MMM D") + " - ENDS " + end.format("MMM D");
    }
        
    var repo_rendered = Mustache.render(template_html, collection);
    item_rendered.push(repo_rendered);

    $(container).html(item_rendered.join(''));
}

function renderFeatureItems(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        if(val.url == "" || val.url === null){
           val.css = "style=cursor:default;";
           val.noLink = "return false";
        }
        var repo_rendered = Mustache.render(template_html,val);
        item_rendered.push(repo_rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderGallery(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        val.image_url = "//mallmaverick.cdn.speedyrails.net" + val.photo_url
        if (val.caption != null && val.caption.length > 0){
            val.alt = val.vaption;
        }else{
            val.alt = "Gallery image " + key
        }
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderGeneral(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        var repo_rendered = Mustache.render(template_html,val);
        item_rendered.push(repo_rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderHomeHours(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    item_list.push(collection);    
    $.each( item_list , function( key, val ) {
        val.day = get_day(val.day_of_week);
        var d = new Date();
        val.month = get_month(d.getMonth());
        val.weekday = addZero(d.getDate());
        if (val.open_time && val.close_time && (val.is_closed == false || val.is_closed == null)){
            var open_time = in_my_time_zone(moment(val.open_time), "h:mma");
            var close_time = in_my_time_zone(moment(val.close_time), "h:mma");
            val.h = open_time + " - " + close_time;
        } else {
            val.h = "Closed";
        }
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderHours(container, template, collection, type){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    if (type == "reg_hours") {
        $.each( collection , function( key, val ) {
            if (!val.store_id && val.is_holiday == false) {
                switch(val.day_of_week) {
                    case 0:
                        val.day = "Sunday";
                        break;
                    case 1:
                        val.day = "Monday";
                        break;
                    case 2:
                        val.day = "Tuesday";
                        break;
                    case 3:
                        val.day = "Wednesday";
                        break;
                    case 4:
                        val.day = "Thursday";
                        break;
                    case 5:
                        val.day = "Friday";
                        break;
                    case 6:
                        val.day = "Saturday";
                        break;
                }
                if (val.open_time && val.close_time && val.is_closed == false){
                    var open_time = moment(val.open_time).tz(getPropertyTimeZone());
                    var close_time = moment(val.close_time).tz(getPropertyTimeZone());
                    val.h = open_time.format("h:mm A") + " - " + close_time.format("h:mm A");
                } else {
                    val.h = "Closed";
                }
                item_list.push(val);
            }
        });
        collection = [];
        collection = item_list;
    }
    if (type == "holiday_hours") {
        $.each( collection , function( key, val ) {
            if (!val.store_id && val.is_holiday == true) {
                holiday = moment(val.holiday_date);
                val.formatted_date = holiday.format("MM/DD/YY");
                if (val.open_time && val.close_time && val.is_closed == false){
                    var open_time = moment(val.open_time).tz(getPropertyTimeZone());
                    var close_time = moment(val.close_time).tz(getPropertyTimeZone());
                    val.h = open_time.format("h:mm A") + " - " + close_time.format("h:mm A");
                } else {
                    val.h = "Closed";
                }
                item_list.push(val);
            }
        });
        collection = [];
        collection = item_list;
    }
    
    $.each( collection , function( key, val ) {
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    
    $(container).show();
    $(container).html(item_rendered.join(''));
};

function renderJobs(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        if(val.jobable_type == "Store"){
            val.store_name = getStoreDetailsByID(val.jobable_id).name;
            val.store_slug = getStoreDetailsByID(val.jobable_id).slug;
        }
        else{
            val.store_name = "Lansdowne Place";
        }
        
        var end = moment(val.end_date).tz(getPropertyTimeZone());
        val.end_date = end.format("MMM D");

        
        if (val.description.length  >= 190) {
            val.description = val.description.substring(0, 189) + "...";
        }
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderJobDetails(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    item_list.push(collection);
    $.each( item_list , function( key, val ) {
        if (val.jobable_type == "Store") {
            var store_details = getStoreDetailsByID(val.jobable_id);
            val.store_slug = store_details.slug;
            val.store_name = store_details.name;
        }
        else{
            val.store_name = "Lansdowne Place";
            val.store_slug = "";
        }
        
        var end = moment(val.end_date).tz(getPropertyTimeZone());
        val.end_date = end.format("MMM D");
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderPromotions(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        if (val.promotionable_type == "Store") {
            var store_details = getStoreDetailsByID(val.promotionable_id);
            val.store_detail_btn = store_details.slug ;
            val.store_name = store_details.name;
            val.image_url = "background-image: url(" + val.promo_image_url_abs + ");";
        }
        else{
            val.store_name = "Lansdowne Place";
            val.image_url = "background-image: url(//codecloud.cdn.speedyrails.net/sites/58f66c9b6e6f647d46000000/image/jpeg/1492633527000/img_default.jpg);";
        }
        
        if(val.image_url.indexOf('missing.png') > 0){
            val.image_url  = "background-image: url(" + store_details.store_front_url_abs + ");";
        }
        
        var show_date = moment(val.show_on_web_date);
        var start = moment(val.start_date).tz(getPropertyTimeZone());
        var end = moment(val.end_date).tz(getPropertyTimeZone());
        if (start.format("DMY") == end.format("DMY")){
            val.dates = start.format("MMM D")
        }
        else{
            val.dates = "Starts " + start.format("MMM D") + " - Ends " + end.format("MMM D")
        }
        
        if (val.description.length  >= 175) {
            val.description = val.description.substring(0, 174) + "...";
        }
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderPromoDetails(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    item_list.push(collection);
    $.each( item_list , function( key, val ) {
        if (val.promotionable_type == "Store") {
            var store_details = getStoreDetailsByID(val.promotionable_id);
            val.store_detail_btn = store_details.slug;
            val.store_name = store_details.name;
            val.image_url = val.promo_image_url_abs;
        }
        else{
            val.store_name = "Lansdowne Place";
            val.image_url = "//codecloud.cdn.speedyrails.net/sites/58f66c9b6e6f647d46000000/image/jpeg/1492633527000/img_default.jpg";
        }
        
        if(val.image_url.indexOf('missing.png') > 0){
            val.image_url  = store_details.store_front_url_abs;
        }
        
        var show_date = moment(val.show_on_web_date);
        var start = moment(val.start_date).tz(getPropertyTimeZone());
        var end = moment(val.end_date).tz(getPropertyTimeZone());
        if (start.format("DMY") == end.format("DMY")){
            val.dates = start.format("MMM D")
        }
        else{
            val.dates = "STARTS " + start.format("MMM D") + " - ENDS " + end.format("MMM D")
        }
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderNewStores(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        if(val.store_front_url.indexOf('missing.png') < 0){
            val.store_front_url = "background-image: url(" + val.store_front_url_abs + ")";
        } else {
            val.store_front_url = "background-image: url(//codecloud.cdn.speedyrails.net/sites/58f66c9b6e6f647d46000000/image/jpeg/1492633527000/img_default.jpg);";
        }
        
        var today = moment();
        var store_opens = moment(val.new_store_open_date);
        if(val.new_store_open_date != null || val.new_store_open_date != undefined){
            if (today.tz(getPropertyTimeZone()) <= store_opens.tz(getPropertyTimeZone())) {
                val.open = "Opens " + moment(val.new_store_open_date).format("MMM DD");
                val.show = "display: block;";
            } else {
                val.open = "Now Open!"
                val.show = "display: block;";
            }
        } else {
            val.show = "display: none;";
        }

        if (val.description.length  >= 190) {
            val.description = val.description.substring(0, 189) + "...";
        }
        var repo_rendered = Mustache.render(template_html,val);
        item_rendered.push(repo_rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderSimple(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    
    var repo_rendered = Mustache.render(template_html, collection);
    item_rendered.push(repo_rendered);

    $(container).html(item_rendered.join(''));
}

function renderStoreList(container, template, collection, type){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    var store_initial="";
    $.each( collection , function( key, val ) {
        if (type == "stores" || type == "category_stores"){
            if(!val.store_front_url ||  val.store_front_url.indexOf('missing.png') > -1 || val.store_front_url.length === 0){
                val.alt_store_front_url = "";
            } else {
                val.alt_store_front_url = getImageURL(val.store_front_url);    
            }
            
        }
        
        var current_initial = val.name[0];
        val.cat_list = val.categories.join(',')
        if(store_initial.toLowerCase() == current_initial.toLowerCase()){
            val.initial = "";
            val.show = "display:none;";
        }
        else{
            val.initial = current_initial;
            store_initial = current_initial;
            val.show = "display:block;";
        }
        
        // if(val.is_coming_soon_store == true){
        //     val.coming_soon_store = "display:inline";
        // }
        // else{
        //     val.coming_soon_store = "display:none";
        // }
        // if(val.is_new_store == true){
        //     val.new_store = "display:inline";
        // }
        // else{
        //     val.new_store = "display:none";
        // }
        
        if (val.promotions.length > 0){
            val.promotion_exist = "display:inline";
            var store_promo = getPromotionsForIds(val.promotions).sortBy(function(o){ return o.start_date })[0];
            if (store_promo != undefined){
                val.promo_btn = "/promotions/" + store_promo.slug;
            }
        }
        else{
            val.promotion_exist = "display:none";
        }
        
        if(val.phone.length < 1){
            val.phone_exist = "display:none";
        }
        
        val.block = current_initial + '-block';
        var rendered = Mustache.render(template_html,val);
        var upper_current_initial = current_initial.toUpperCase();
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderStoreDetails(container, template, collection, slug){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    item_list.push(collection);
    $.each( item_list , function( key, val ) {
        if ((val.store_front_url).indexOf('missing.png') > -1){
            val.alt_store_front_url = "//codecloud.cdn.speedyrails.net/sites/58f66c9b6e6f647d46000000/image/jpeg/1492633527000/img_default.jpg";
        } else {
            val.alt_store_front_url = getImageURL(val.store_front_url); 
        }

        var cat_list = val.categories;
        val.category_list = getCategoryDetails(cat_list);
        
        if (val.phone != null && val.phone.length > 0){
            val.phone_show = "display:inline-block";
        }
        else{
            val.phone_show = "display:none";
        }
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderStoreDetailsHours(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        switch(val.day_of_week) {
            case 0:
                val.day = "Sunday";
                break;
            case 1:
                val.day = "Monday";
                break;
            case 2:
                val.day = "Tuesday";
                break;
            case 3:
                val.day = "Wednesday";
                break;
            case 4:
                val.day = "Thursday";
                break;
            case 5:
                val.day = "Friday";
                break;
            case 6:
                val.day = "Saturday";
                break;
            
        }
        var open_time = in_my_time_zone(moment(val.open_time), "h:mmA");
        var close_time = in_my_time_zone(moment(val.close_time), "h:mmA");
       
        if (val.is_closed == true){
            val.hour_string = "Closed"
        } else {
            val.hour_string = open_time + " - " + close_time;
        }
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}