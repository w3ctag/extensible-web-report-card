"use strict";

var sidebar = document.querySelector("#sidebar");
var ol = document.createElement("ol");
sidebar.appendChild(ol);

var idCounter = 0;

Array.prototype.forEach.call(document.querySelectorAll("section.grade"), function (section) {
    var grade = section.querySelector("h2");
    grade.id = 'toc-' + idCounter++;

    var li = document.createElement("li");
    li.innerHTML = "<a href='#" + grade.id + "'>" + grade.textContent + '</a>';
    ol.appendChild(li);

    var gradeOl = document.createElement("ol");
    li.appendChild(gradeOl);

    var features = section.querySelectorAll("h3");
    Array.prototype.forEach.call(features, function (feature) {
        feature.id = 'toc-' + idCounter++;

        var featureLI = document.createElement("li");
        featureLI.innerHTML = "<a href='#" + feature.id + "'>" + feature.textContent + '</a>';
        gradeOl.appendChild(featureLI);
    });
});
