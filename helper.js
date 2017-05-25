function init() {
    
    
    $("#search_button").click(function() {
        search_site();    
    });
    function search_site(){
        if($("#SearchTerms").val() != ""){
            window.location.href = "/search?query=" + $("#SearchTerms").val();
        }
    }
    // onkeydown="if (event.keyCode ==13) document.getElementById('search_button').click()"
    
    $("#mobile_menu").click(function() {
        toggle_dropdown();
    });   
    function toggle_dropdown(){
        $(".dropdown-menu").toggle();
    }
    
    blog_searcher();
   
    function subscribe_email(){ 
        if (isValidEmailAddress($("#subscribe_email").val())){            
            var data = {}
            var contest = {}
            contest["email"] = $("#subscribe_email").val();
            contest["newsletter"] = true;
            contest["property_id"] = 51;
            data["contest"] = contest
            data["notice"] = "false"
            $.ajax({
                url: "/newsletter_no_captcha",
                type: "POST",
                data: data,
                success: function(response){                    
                    alert("Thank you for signing up.");
                },
                error: function(xhr, ajaxOptions, thrownError){
                    alert("Please try again later.");
                }
            })    
        } else {
            alert("Please enter a valid email address. ")
        }
    }

    function side_subscribe_email(){ 
        if (isValidEmailAddress($("#side_subscribe_email").val())){            
            var data = {}
            var contest = {}
            contest["email"] = $("#side_subscribe_email").val();
            contest["newsletter"] = true;
            contest["property_id"] = 51;
            data["contest"] = contest
            data["notice"] = "false"
            $.ajax({
                url: "/newsletter_no_captcha",
                type: "POST",
                data: data,
                success: function(response){                    
                    alert("Thank you for signing up.");
                },
                error: function(xhr, ajaxOptions, thrownError){
                    alert("Please try again later.");
                }
            })    
        } else {
            alert("Please enter a valid email address. ")
        }
    }
    
    
}

function show_content() {
    var home_feature_items = getFeatureList();
    renderFeatureItems("#home_feature_item_container", "#home_feature_item_template", home_feature_items);
    
    var promo_list = getPromotionsList();
    var side_promos = promo_list.slice(0,3);
    renderPromotions("#home_promo_container", "#home_promo_template", side_promos);
    renderPromotions("#side_promo_container", "#side_promo_template", side_promos);
    
    var events = getEventsList();
    renderEvents("#home_events_container", "#home_events_template", events);
    
    var todays_hours = getTodaysHours();
    renderHomeHours("#home_hours_container", "#home_hours_template", todays_hours);
    renderHomeHours("#side_hours_container", "#side_hours_template", todays_hours);
    
    var prop_details = getPropertyDetails();
    renderSimple("#home_details_container", "#home_details_template", prop_details);
    renderSimple("#prop_details_container", "#prop_details_template", prop_details);
    
    var side_feature_items = getRepoDetailsByName("Side Bar Feature Items").images;
    console.log(side_feature_items);
    renderGeneral("#side_feature_items_container", "#side_feature_items_template", side_feature_items);
}

function blog_searcher(){
    $('#close_search').click(function(){
        $(this).hide();
        $('#search_results_stores').html('');
        $('#search_results_events').html('');
        $('#search_results_promotions').html('');
        $('#search_results_stores').hide();
        $('#search_results_events').hide();
        $('#search_results_promotions').hide();
        $('#site_search').val('')
    });
    $('#site_search').keyup(function(){
        if ($('#site_search').val() == ""){
            $('#search_results_stores').html('');
            $('#search_results_events').html('');
            $('#search_results_promotions').html('');
            $('#search_results_stores').hide();
            $('#search_results_events').hide();
            $('#search_results_promotions').hide();
            $('#close_search').hide();
        }
        else{
            $('#close_search').show();
            $('#search_results_stores').html('');
            $('#search_results_events').html('');
            $('#search_results_promotions').html('');
            
            var val = $(this).val().toLowerCase();
            
            results = getSearchResults(val);
            var s_stores = results.stores;
            var s_events = results.events;
            var s_promos = results.promotions;
            
            if(s_stores !=undefined && s_stores.length > 0){
                var h2_stores = "<h2 id='open_stores' class='li_open'>(" +s_stores.length + ") Stores<i class='pull-right fa fa-chevron-down'></i></h2>";
                $('#search_results_stores').append(h2_stores);
                $.each(s_stores, function(i, v){
                    var div_stores = "<div class='blog_search_results collapse_open_stores'>";
                    div_stores = div_stores + "<h4><a href='/stores/" + v.slug + "'>" + v.name + "</a></h4>";
                    div_stores = div_stores + "</div>";
                    $('#search_results_stores').append(div_stores);
                    $('#search_results_stores').show();
                });
            }
            if(s_promos != undefined && s_promos.length > 0){
                var h2_promotions = "<h2 id='open_promotions' class='li_open'>(" +s_promos.length + ") Promotions<i class='pull-right fa fa-chevron-down'></i></h2>";
                $('#search_results_promotions').append(h2_promotions);
                $.each(s_promos, function(i, v){
                    var div = "<div class='blog_search_results collapse_open_promotions'>";
                    div = div + "<h4><a href='/promotions/" + v.slug + "'>" + v.name + "</a></h4>";
                    div = div + "</div>";
                    $('#search_results_promotions').append(div);
                    $('#search_results_promotions').show();
                });
            }   
            if(s_events != undefined && s_events.length > 0){
                var h2_events = "<h2 id='open_events' class='li_open'>(" +s_events.length + ") Events<i class='pull-right fa fa-chevron-down'></i></h2>";
                $('#search_results_stores').append(h2_events);
                $.each(s_events, function(i, v){
                    var div = "<div class='blog_search_results collapse_open_events'>";
                    div = div + "<h4><a href='/events/" + v.slug + "'>" + v.name + "</a></h4>";
                    div = div + "</div>";
                    $('#search_results_stores').append(div);
                    $('#search_results_stores').show();
                });
            }
            
            
            
            $('.li_open').click(function(){
                var collapse = ".collapse_" + $(this).attr('id');
                if($(this).hasClass('open')){
                    $(collapse).slideUp('fast');
                    $(this).removeClass('open');
                }
                else{
                    $(this).addClass('open');
                    $(collapse).slideDown('fast');
                }
                
            })
            
        }
    });
}