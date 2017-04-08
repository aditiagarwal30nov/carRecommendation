
// With JQuery
$("#carBudget").slider({
});
$("#fuelBudget").slider({
});
$("#averageKM").slider({
});

$('#carForm').submit(function() {
$.ajax({
	type: 'GET',
	url: '/cars?'+ $('form').serialize(),
	dataType: 'json',
	success: function(data) {
    $('#carTable').bootstrapTable('load' , data);
   },
   error: function(e) {
       console.log(e.responseText);
   }
});
return false;
});