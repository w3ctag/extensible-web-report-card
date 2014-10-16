"use strict";

var sidebar = document.querySelector("#sidebar");
var ol = document.createElement("div");
ol.id = 'toc';
sidebar.appendChild(ol);

var idCounter = 0;

function makeLink(id, text)
{
    var a = document.createElement('a');
    a.href = '#' + id;
    a.textContent = text
    return a;
}

Array.prototype.forEach.call(document.querySelectorAll("section.grade"), function (section) {
    var grade = section.querySelector("h2");
    grade.id = 'toc-' + idCounter++;

    var li = document.createElement("p");
    li.appendChild(makeLink(grade.id,  grade.textContent));
    ol.appendChild(li);

    var gradeOl = document.createElement("ul");
    li.appendChild(gradeOl);

    var features = section.querySelectorAll("h3");
    Array.prototype.forEach.call(features, function (feature) {
        feature.id = 'toc-' + idCounter++;

        var featureLI = document.createElement("li");
        featureLI.appendChild(makeLink(feature.id, feature.textContent));
        gradeOl.appendChild(featureLI);
    });
});
