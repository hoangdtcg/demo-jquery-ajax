$(document).ready(function () {
    // $('#hide-form').on('click',function () {
    //     // console.log()
    //     if($('#hide-form').html() == "Hide") {
    //         $('form').hide();
    //         $('#hide-form').text('Show');
    //     }else {
    //         $('form').show();
    //         $('#hide-form').text('Hide');
    //     }
    // });
    let data;
    let txtSearch = '';
    $.ajax({
        url: "https://fakestoreapi.com/products",
        data: {},
        type: "GET",
        dataType: "json"
    }).done(function (response) {
        // console.log(response);
        data = response;
        display(response);
    }).fail(function () {
        console.log("Fail")
    });

    $('#input-search').on('input',search);

    function search() {
        let find = $('#input-search').val();
        txtSearch = find;
        let arr = [];
        jQuery.each( data, function( key, val ) {
            // console.log(val)
            // $( "#" + val ).text( "Mine is " + val + "." );
            if(val.title.toLowerCase().indexOf(find.toLowerCase()) >= 0){
                arr.push(val);
            }
        });
        display(arr);
    }

    function display(response) {
        $('#table-data').html("");
        let str= "";
        jQuery.each( response, function( key, val ) {
            // $( "#" + val ).text( "Mine is " + val + "." );
            str += ("<tr>" +
                "<td>"+val.id+"</td>" +
                "<td><img width='100px' src="+val.image+"></td>" +
                "<td class='title'>"+val.title+"</td>" +
                "<td>"+val.description+"</td>" +
                "<td>"+val.price+"</td>" +
                "</tr>");

            // Will stop running after "three"
        });
        $('#table-data').html(str);
        //Highlight text search
        if(txtSearch != '') {
            $('.title').html($('.title').html().toLowerCase().replace(txtSearch, `<span style="background-color: yellow">${txtSearch}</span>`));
        }
    }
});
