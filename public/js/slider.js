
// With JQuery
$("#carBudget").slider({
});
$("#fuelBudget").slider({
});
$("#averageKM").slider({
});
var jsonData = null;
$('#carForm').submit(function() {
$.ajax({
	type: 'GET',
	url: '/cars?'+ $('form').serialize(),
	dataType: 'json',
	success: function(data) {
	jsonData = processImages(data);
	splittedData = splitData(jsonData);
	$('#carTable').bootstrapTable('load' , splittedData.firstTable);
    $('#carTable2').bootstrapTable('load' , splittedData.secondTable);
   },
   error: function(e) {
       console.log(e.responseText);
   }
});
return false;
});

function processImages(data){
	for (var key in data)
	{
		var obj = data[key].IMG;
		data[key].IMG = '<img src="'+ obj + '">';
		data[key].MODEL = data[key].MODEL.toUpperCase();
		data[key].BRAND = data[key].BRAND.toUpperCase();
	}
	return data;
}


function splitData(data){
	splittedData = {}
	splittedData.firstTable = []
	splittedData.secondTable = []
	for(var key in data){
		if (parseInt(key) % 2 == 0){
			splittedData.firstTable.push(data[key])
		}else{
			splittedData.secondTable.push(data[key])
		}
	}
	return splittedData;
}