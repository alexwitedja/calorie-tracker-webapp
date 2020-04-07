const arrayReduce = (array) => {
    var groups = {};
    for (var i = 0; i < array.length; i++) {
        var groupName = array[i].date;
        if(!groups[groupName]) {
            groups[groupName] = [];
        }
        groups[groupName].push(array[i].calories);
    }

    var newArray = [];
    newArray.push(["Date", "Calories"])
    for (var groupName in groups) {
        newArray.push([groupName, calculateSum(groups[groupName])]);
    }
    
    return newArray;
}

const calculateSum = (array) => {
    var sum = 0
    for (var i = 1; i < array.length; i++) {
        sum += array[i];
    }
    return sum;
}

module.exports = arrayReduce