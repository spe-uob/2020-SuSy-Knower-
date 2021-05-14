(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/joelbearn/BrsU/Year2/GitHub/SuSy-Knower-/FrontEnd/src/main.ts */"zUnb");


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    api_base_Url: 'http://ec2-3-90-191-26.compute-1.amazonaws.com:8080/'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "EilE":
/*!**********************************************!*\
  !*** ./src/app/network/network.component.ts ***!
  \**********************************************/
/*! exports provided: NetworkComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NetworkComponent", function() { return NetworkComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var vis_network__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vis-network */ "CHqH");
/* harmony import */ var vis_network__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vis_network__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vis_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vis-data */ "WHLo");
/* harmony import */ var vis_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vis_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _services_unit_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../services/unit.service */ "OcBZ");
/* harmony import */ var _components_search_bar_search_bar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/search-bar/search-bar.component */ "lCy9");
/* harmony import */ var _components_reset_button_reset_button_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/reset-button/reset-button.component */ "OlVi");







const _c0 = ["siteConfigNetwork"];
const _c1 = ["pop"];
var Mode;
(function (Mode) {
    Mode[Mode["UNIT"] = 1] = "UNIT";
    Mode[Mode["SUBJECT"] = 2] = "SUBJECT";
    Mode[Mode["SCHOOL"] = 3] = "SCHOOL";
    Mode[Mode["FACULTY"] = 4] = "FACULTY";
    Mode[Mode["CLUSTERCENTRE"] = 5] = "CLUSTERCENTRE";
})(Mode || (Mode = {}));
class NetworkComponent {
    constructor(unitService) {
        this.unitService = unitService;
        this.nodes = new vis_data__WEBPACK_IMPORTED_MODULE_2__["DataSet"]([]);
        this.edges = new vis_data__WEBPACK_IMPORTED_MODULE_2__["DataSet"]([]);
    }
    ngOnInit() {
        this.clusters = [];
        this.current_max_tb = 0;
        this.current_max_units_per_tb = 0;
        this.unit_width = 150;
        this.unit_height = 100;
        this.done = 0;
        this.mode = Mode.FACULTY;
        this.current_subject_nodes = [];
        this.current_Subject = "No Subject";
        this.current_pre_reqs = [];
        this.current_post_reqs = [];
        var data = {
            nodes: this.nodes,
            edges: this.edges
        };
        this.Get_Subject_List();
        this.Get_School_List();
        this.Get_Faculty_List();
        this.getUnits(data);
        // create an array with edges
    }
    //Observer of the unitservice to recieve units from database
    getUnits(data) {
        this.unitService.getUnits().subscribe((response) => {
            this.units = response;
            data = this.Get_Network_Data(response, data.nodes, data.edges);
            this.done++;
            this.All_Data_Loaded_Check();
        }, (error) => { alert(error.message); });
        console.log("Getting units");
    }
    All_Data_Loaded_Check() {
        if (this.done >= 4) {
            this.Load_Vis_Network();
            this.Format_Loaded_Data(this.nodes, this.edges);
        }
    }
    //Create the network itself
    Load_Vis_Network() {
        var data = {
            nodes: this.nodes,
            edges: this.edges,
        };
        console.log("Loading Network");
        var mode_type = Mode.FACULTY;
        var node_size = 10;
        var container = document.getElementById("mynetwork");
        var options = {
            interaction: { zoomView: true, zoomSpeed: 0.2 },
            nodes: { shape: "dot", size: node_size, borderWidth: node_size / 2, borderWidthSelected: node_size / 2,
                color: { border: 'green', background: "white",
                    highlight: { border: 'black', background: 'white' }, },
                font: { face: "tahoma", size: 9, strokeWidth: 3, strokeColor: "#ffffff" },
                level: 0,
                fixed: true,
            },
            edges: {
                width: node_size / 8,
                arrows: { to: { enabled: true, scaleFactor: 0.5 } },
                smooth: false,
                selectionWidth: node_size / 3,
            },
            physics: { enabled: true, barnesHut: { gravitationalConstant: -4000, centralGravity: 0.5 }, maxVelocity: 4,
            },
            layout: {
                hierarchical: { enabled: false, direction: "LR" }
            },
        };
        this.network = new vis_network__WEBPACK_IMPORTED_MODULE_1__["Network"](container, data, options);
        this.network.setOptions(options);
        // nodes.add({id: 255, label: 'Node 255'});
        // nodes.add({id: 256, label: 'Node 256'});
        // var node255 = nodes.get(255);
        // var node256 = nodes.get(256);
        // this.Set_Node_Position(node255,nodes,5,5);
        // this.Style_Descendents([255,256],nodes,edges);
    }
    Get_Network_Data(units, nodes, edges) {
        units.forEach(unit => {
            var prerequisites = this.Find_Prerequisites(unit);
            nodes.add({ id: unit.id, label: this.Resize_Label(unit.name), subject: unit.programme,
                topic: this.Check_Topic(unit.topic), level: this.Find_Level(unit),
                type: Mode.UNIT, url: unit.url, group: this.Check_Topic(unit.topic) });
            prerequisites.forEach(prereq => {
                edges.add({ from: prereq, to: unit.id });
            });
        });
        var data = { nodes: nodes, edges: edges, };
        console.log("Turning data into nodes and edges");
        return data;
    }
    //Once data has been recieved from database, organise it into the original view
    Format_Loaded_Data(nodes, edges) {
        this.Run_Network_Events(nodes, edges);
        this.Cluster_All(this.subjects, this.schools, this.faculties); //
        this.initial_View_scale = this.network.getScale();
        this.initital_View_Position = this.network.getViewPosition();
    }
    //Handles click zoom and drawing events
    Run_Network_Events(nodes, edges) {
        var that = this;
        var canvas = this.network.canvas.frame.canvas;
        this.network.once("stabilizationIterationsDone", function () {
        });
        this.network.on("beforeDrawing", function (ctx) {
            that.Draw_Title("University of Bristol: Knowlege Map", ctx, 0, -canvas.height / 6);
            that.Draw_Body("Double click to navigate", ctx, 0, -canvas.height / 6 + 50);
            if (that.mode == Mode.UNIT) {
                for (let i = 0; i < that.current_max_tb; i++) {
                    if (i % 2 == 0) {
                        that.Draw_Teaching_Block(ctx, -225 + i * that.unit_width, 20 - that.unit_height / 2, that.unit_width, that.unit_height * that.current_max_units_per_tb);
                    }
                    that.Draw_TB_Title(ctx, -225 + that.unit_width * i, 0, Math.ceil((i + 1) / 2), (i % 2) + 1);
                }
                that.Draw_Sub_Title(that.current_Subject, ctx, 0, -130);
                that.Draw_Body("Click to a unit to see requirements, Double click to open its webpage", ctx, 0, -80);
            }
        });
        this.network.on("afterDrawing", function (ctx) {
        });
        this.network.on("initRedraw", function () { });
        this.network.on('click', function (params) {
            that.Click(params, nodes, edges);
        });
        this.network.on('doubleClick', function (params) {
            that.Double_click(params, nodes, edges);
        });
        this.network.on("zoom", function (params) { });
    }
    //CANVAS DRAWING
    Draw_Title(title, ctx, x, y) {
        ctx.font = "bold 40px Tahoma";
        ctx.textAlign = "center";
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 30;
        ctx.strokeText(title, x, y);
        ctx.fillStyle = 'rgba(200,0,0,1)';
        ctx.fillText(title, x, y);
    }
    Draw_Sub_Title(title, ctx, x, y) {
        ctx.font = "30px Tahoma";
        ctx.textAlign = "center";
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 20;
        ctx.strokeText(title, x, y);
        ctx.fillStyle = 'rgba(0,0,0,1)';
        ctx.fillText(title, x, y);
    }
    Draw_Body(title, ctx, x, y) {
        ctx.font = "10px Tahoma";
        ctx.textAlign = "center";
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 10;
        ctx.strokeText(title, x, y);
        ctx.fillStyle = 'rgba(0,0,0,1)';
        ctx.fillText(title, x, y);
    }
    Draw_Teaching_Block(ctx, x, y, width, height) {
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fillRect(x - width / 2, y, width, height);
    }
    Draw_TB_Title(ctx, x, y, year, tb) {
        var defecit = 50;
        ctx.font = "bold italic 10px Arial";
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.textAlign = "center";
        ctx.fillText(`Year ${year} TB${tb}`, x, y - defecit);
    }
    //EVENTS
    Double_click(params, nodes, edges) {
        if (params.nodes.length) {
            var selected_node_id = params.nodes[0];
            if (this.network.isCluster(selected_node_id)) {
                this.Uncluster(selected_node_id);
            }
            else {
                console.log("node is NOT a cluster");
                var unit = nodes.get(selected_node_id);
                window.open(unit.url, "_blank");
            }
        }
    }
    Click(params, nodes, edges) {
        console.log(this.current_subject_nodes);
        //console.log(nodes[0]);
        if (this.mode == Mode.UNIT) {
            this.current_subject_nodes.forEach(id => {
                node = nodes.get(id);
                this.Reset_Style(node.topic, nodes, node.id);
            });
        }
        var clicked_node_id = params.nodes[0];
        if (clicked_node_id) {
            console.log(nodes.get(clicked_node_id));
        }
        if (params.nodes.length) {
            if (this.network.isCluster(params.nodes[0])) {
                console.log("Selected node is a cluster");
                console.log(this.network.getNodesInCluster(params.nodes[0]));
            }
            else {
                var node = nodes.get(clicked_node_id);
                if (node.type == Mode.UNIT) {
                    var ancestors_Ids = this.Get_Ancestors_Ids(clicked_node_id, edges);
                    this.Style_Ancestors(ancestors_Ids, nodes);
                    var descendents_Ids = this.Get_Descendents_Ids(clicked_node_id, edges);
                    this.Style_Descendents(descendents_Ids, nodes);
                    var relatives = ancestors_Ids.concat(descendents_Ids);
                    var non_relatives = [];
                    this.current_subject_nodes.forEach(id => {
                        if (!(relatives.includes(id)) && id != clicked_node_id) {
                            non_relatives.push(id);
                        }
                    });
                    console.log(non_relatives);
                    this.Fade_Nodes(non_relatives, nodes);
                }
            }
        }
        else {
            console.log("No node clicked");
        }
    }
    Unit_View() {
    }
    //FINDING DATA
    Check_Topic(topic) {
        if (topic) {
            return topic;
        }
        else {
            return "1";
        }
    }
    Find_Prerequisites(unit) {
        var prereqStr = unit.prerequisites;
        var prereqChar = [];
        var prereqs = [];
        if (prereqStr != null) {
            prereqChar = prereqStr.split(',');
            prereqChar.forEach(char => { prereqs.push(parseInt(char)); });
        }
        return prereqs;
        return [1, 2, 3];
    }
    Find_Level(unit) {
        return unit.tb;
    }
    Find_Node_Id_From_Label(label) {
        console.log(label);
        var node_id = -1;
        this.nodes.forEach(node => {
            if (node.label.toLowerCase().includes(label.toLowerCase())) {
                node_id = node.id;
            }
        });
        return node_id;
    }
    Get_Subject_List() {
        this.unitService.getSubjects().subscribe((response) => {
            this.subjects = response;
            this.done++;
            this.All_Data_Loaded_Check();
        }, (error) => { alert(error.message); });
    }
    Get_School_List() {
        this.unitService.getSchools().subscribe((response) => {
            this.schools = response;
            this.done++;
            this.All_Data_Loaded_Check();
        }, (error) => { alert(error.message); });
    }
    Get_Faculty_List() {
        this.unitService.getFaculties().subscribe((response) => {
            this.faculties = response;
            this.done++;
            if (this.done >= 4) {
                this.Format_Loaded_Data(this.nodes, this.edges);
            }
        }, (error) => { alert(error.message); });
    }
    Find_School(subject) {
        if (subject == "Computer Science (BSc)" || subject == "Electrical and Electronic Engineering (BEng)") {
            return "School of Computer Science";
        }
        else if (subject == "Aerospace Engineering (BEng)" || subject == "Civil Engineering (BEng)") {
            return "School of Aerospace Engineering";
        }
        else if (subject == "Physics (BSc)" || subject == "Chemical Physics (BSc)") {
            return "School of Physics";
        }
        else if (subject == "Anthropology (BA)") {
            return "School of Anthropology and Archaeology";
        }
        else if (subject == "Philosophy (BA)") {
            return "School of Philosophy";
        }
        else if (subject == "Psychology (BSc)") {
            return "School of Psychological Science";
        }
        else if (subject == "Mathematics (MSci)" || subject == "Data Science (BSc)") {
            return "School of Mathematics";
        }
        else if (subject == "Honours Law (LLB)") {
            return "University of Bristol Law School";
        }
        else if (subject == "Management (BSc)") {
            return "School of Management";
        }
        else if (subject == "English (BA)") {
            return "School of English";
        }
        else if (subject == "Zoology (BSc)") {
            return "School of Biological Sciences";
        }
        else {
            return "Error";
        }
    }
    Find_Faculty(school) {
        //return "WRITE FUNCTION";
        if (school == "School of Computer Science" || school == "School of Aerospace Engineering") {
            return "Engineering";
        }
        else if (school == "School of Mathematics" || school == "School of Physics") {
            return "Science";
        }
        else if (school == "University of Bristol Law School" || school == "School of Management") {
            return "Social Sciences and Law";
        }
        else if (school == "School of Philosophy" || school == "School of Anthropology and Archaeology" || school == "School of English") {
            return "Arts";
        }
        else if (school == "School of Psychological Science" || school == "School of Biological Sciences") {
            return "Life Sciences";
        }
        else {
            return "Faculty of Engineering";
        }
    }
    Search($event) {
        if ($event != '') {
            var searched_id = this.Find_Node_Id_From_Label($event);
            if (searched_id != -1) {
                var pathway = this.network.findNode(searched_id);
                for (let i = 0; i < pathway.length - 1; i++) {
                    const cluster = pathway[i];
                    //this.network.selectNodes([pathway[i]]);
                    this.Uncluster(cluster);
                }
                this.network.selectNodes([searched_id]);
            }
            else {
                console.log("No such Unit");
            }
        }
    }
    Reset_Graph($event) {
        console.log("Resetting...");
        this.Turn_Off_Physics(this.network.options);
        console.log(this.current_subject_nodes);
        this.current_subject_nodes.forEach(id => {
            var node = this.nodes.get(id);
            console.log(node);
            this.Reset_Style(node.topic, this.nodes, node.id);
        });
        this.current_subject_nodes = [];
        this.current_Subject = "No Subject";
        this.current_pre_reqs = [];
        this.current_post_reqs = [];
        this.mode = Mode.FACULTY;
        this.Cluster_All(this.subjects, this.schools, this.faculties); //
        this.network.moveTo({ position: this.initital_View_Position, scale: this.initial_View_scale });
        this.clusters.forEach(cluster_id => {
            this.network.clustering.updateClusteredNode(cluster_id, { x: 0, y: 0 });
        });
    }
    //GETTING PRE/POST REQUITSITE IDS
    Get_Parents_Ids(node_Id, edges) {
        var parents_Ids = [];
        var edge_Ids = this.network.getConnectedEdges(node_Id);
        edge_Ids.forEach(edge_Id => {
            var edge = edges.get(edge_Id);
            if (edge.from == node_Id) {
                parents_Ids.push(edge.to);
            }
        });
        console.log(parents_Ids);
        return parents_Ids;
    }
    Get_Ancestors_Ids(node_Id, edges) {
        var ancestors_Ids = [];
        ancestors_Ids = ancestors_Ids.concat(this.Get_Parents_Ids(node_Id, edges));
        ancestors_Ids.forEach(ancestor => {
            this.Get_Ancestors_Ids(ancestor, edges);
        });
        this.current_post_reqs = ancestors_Ids;
        return ancestors_Ids;
    }
    Get_Children_Ids(node_Id, edges) {
        var children_Ids = [];
        var edge_Ids = this.network.getConnectedEdges(node_Id);
        edge_Ids.forEach(edge_Id => {
            var edge = edges.get(edge_Id);
            if (edge.to == node_Id) {
                children_Ids.push(edge.from);
            }
        });
        console.log(children_Ids);
        return children_Ids;
    }
    Get_Descendents_Ids(node_Id, edges) {
        var descendents_Ids = [];
        descendents_Ids = descendents_Ids.concat(this.Get_Children_Ids(node_Id, edges));
        descendents_Ids.forEach(descendent => {
            this.Get_Descendents_Ids(descendent, edges);
        });
        this.current_pre_reqs = descendents_Ids;
        return descendents_Ids;
    }
    Style_Ancestors(ancestor_Ids, nodes) {
        ancestor_Ids.forEach(ancestor_Id => {
            var parent = nodes.get(ancestor_Id);
            parent.color = { background: "red" };
            nodes.update(parent);
        });
    }
    Style_Descendents(descendent_Ids, nodes) {
        descendent_Ids.forEach(descendent_Id => {
            var descendent = nodes.get(descendent_Id);
            descendent.color = { background: "lightgreen" };
            nodes.update(descendent);
        });
    }
    //STYLING
    Style_Node(node, style) {
    }
    Fade_Node(node_id, nodes) {
        var node = nodes.get(node_id);
        node.color = 'rgba(100,100,100,0.1)';
        nodes.update(node);
    }
    Fade_Nodes(node_ids, nodes) {
        node_ids.forEach(id => {
            this.Fade_Node(id, nodes);
        });
    }
    Reset_Style(topic, nodes, node_id) {
        if (topic == null) {
            topic = 1;
        }
        var gr = this.network.groups._defaultGroups[topic];
        gr.id = node_id;
        nodes.update({ id: node_id, color: { background: gr.background, border: gr.border, highlight: gr.highlight } });
    }
    Resize_Label(label) {
        if (label.length < 17) {
            return label;
        }
        else {
            label = label.split(' ').join('\n');
            return label;
        }
    }
    Cluster_One_Subject(subject, id) {
        console.log("Clustering One Subject");
        var joinCon = function (nodeOptions) {
            return nodeOptions.subject == subject;
        };
        var cluster_properties = {
            level: 0,
            label: subject,
            id: id,
            school: this.Find_School(subject),
            type: Mode.SUBJECT,
            size: 14,
            borderWidth: 7,
            font: { size: 12 },
            allowSingleNodeCluster: true,
            fixed: false
        };
        this.network.cluster({ joinCondition: joinCon, clusterNodeProperties: cluster_properties });
    }
    Cluster_Sujects(subjects) {
        console.log("Clustering Many Subjects");
        var id = 1000;
        subjects.forEach(subject => {
            this.Cluster_One_Subject(subject, id);
            id++;
        });
    }
    Cluster_One_School(school, id) {
        console.log("Clustering One School");
        var joinCon = function (nodeOptions) {
            return nodeOptions.school == school;
        };
        var cluster_properties = {
            level: 0,
            label: school,
            color: { border: 'red' },
            id: id,
            faculty: this.Find_Faculty(school),
            type: Mode.SCHOOL,
            size: 17,
            borderWidth: 8,
            font: { size: 12 },
            allowSingleNodeCluster: true,
            fixed: false,
        };
        this.network.cluster({ joinCondition: joinCon, clusterNodeProperties: cluster_properties });
    }
    Add_Centre_Node(id, faculty, nodes, edges) {
        nodes.add({ id: id, color: "green", faculty: faculty, type: Mode.CLUSTERCENTRE });
    }
    Add_Centre_Nodes(id, faculty, nodes, edges, faculties) {
        faculties.forEach(element => {
        });
    }
    Cluster_Schools(schools) {
        console.log("Clustering Many Schools");
        var id = 2000;
        schools.forEach(school => {
            this.Cluster_One_School(school, id);
            id++;
        });
    }
    Cluster_One_Faculty(faculty, id) {
        console.log("Clustering One Faculty");
        var joinCon = function (nodeOptions) {
            //console.log(nodeOptions.faculty);
            return nodeOptions.faculty == faculty;
        };
        var properties = {
            level: 0,
            color: { border: 'rgba(0,0,200,1)' },
            label: faculty,
            id: id,
            type: Mode.FACULTY,
            size: 25,
            borderWidth: 10,
            font: { size: 12 },
            allowSingleNodeCluster: true,
            fixed: false,
        };
        if (!this.clusters.includes(id)) {
            this.clusters.push(id);
        }
        console.log(this.clusters);
        this.network.cluster({ joinCondition: joinCon, clusterNodeProperties: properties });
    }
    Cluster_Faculties(faculties) {
        console.log("Clustering Many Faculties");
        var id = 3000;
        faculties.forEach(faculty => {
            this.Cluster_One_Faculty(faculty, id);
            id++;
        });
    }
    Uncluster(cluster_id) {
        console.log("Unclustering cluster");
        var cluster = this.network.body.nodes[cluster_id].options;
        if (cluster.type == Mode.SUBJECT) {
            var nodes_in_cluster = this.network.getNodesInCluster(cluster_id);
            this.current_Subject = cluster.label;
            this.current_subject_nodes = nodes_in_cluster;
            this.network.openCluster(cluster_id);
            this.Set_Unit_Positions(nodes_in_cluster, this.nodes);
            nodes_in_cluster.forEach(id => {
                var node = this.nodes.get(id);
                this.Reset_Style(node.topic, this.nodes, node.id);
            });
            this.Fit_To_Selection(nodes_in_cluster);
            this.mode = Mode.UNIT;
            this.Turn_On_Physics(this.network.options);
        }
        else if (cluster.type == Mode.FACULTY) {
            this.mode = Mode.SCHOOL;
            var nodes_in_cluster = this.network.getNodesInCluster(cluster_id);
            this.network.openCluster(cluster_id);
            //this.Fit_To_Selection(nodes_in_cluster)
        }
        else if (cluster.type == Mode.SCHOOL) {
            this.mode = Mode.SUBJECT;
            var nodes_in_cluster = this.network.getNodesInCluster(cluster_id);
            this.network.openCluster(cluster_id);
            //this.Fit_To_Selection(nodes_in_cluster)
        }
    }
    Cluster_All(subjects, schools, faculties) {
        this.Cluster_Sujects(subjects);
        this.Cluster_Schools(schools);
        this.Cluster_Faculties(faculties);
    }
    Turn_On_Physics(options) {
        console.log("Turning Physics On");
        options.physics = { wind: { x: 0, y: 2 } };
        this.network.setOptions(options);
    }
    Turn_Off_Physics(options) {
        console.log("Turning Physics Off");
        options.physics = { wind: { x: 0, y: 0 } };
        this.network.setOptions(options);
    }
    Turn_Off_Hierarchical(options) {
        console.log("Turning Hierarchical Off");
        options.layout = { hierarchical: false };
        this.network.setOptions(options);
    }
    Turn_On_Hierarchical(options) {
        console.log("Turning Hierarchical On");
        options.layout = { hierarchical: { enabled: true, direction: "LR" } };
        console.log(options.layout.hierarchical);
        this.network.setOptions(options);
    }
    Test_Routine() {
    }
    Fit_To_Selection(node_Ids) {
        console.log(node_Ids);
        this.network.fit({ nodes: node_Ids, animation: true });
        //var pos = this.network.getViewPosition();
        //this.network.moveTo({position:{x:pos.x,y:pos.y}})
        //this.network.moveTo
    }
    Set_Node_Position(node, nodes, x, y) {
        node.x = x;
        node.y = y;
        nodes.update(node);
    }
    Set_Unit_Positions(node_ids, nodes) {
        var y = 0;
        var currentLevel = -1;
        var xOffset = -375; // should be number of levels+1/2 *150
        var yValues = [];
        node_ids.forEach(unit => {
            var node = nodes.get(unit);
            if (node.level > this.current_max_tb) {
                this.current_max_tb = node.level;
            }
            if (!(node.level == currentLevel)) {
                if (yValues[node.level]) {
                    yValues[node.level] += 1;
                }
                else {
                    if (yValues[node.level] == 0) {
                        yValues[node.level] += 1;
                    }
                    else {
                        yValues[node.level] = 0;
                    }
                }
                y = 0; //yValues[node.level];
                currentLevel = node.level;
            }
            else {
                yValues[node.level] += 1;
            }
            if (yValues[node.level] + 1 > (this.current_max_units_per_tb)) {
                this.current_max_units_per_tb = yValues[node.level] + 1;
            }
            this.Set_Node_Position(node, nodes, this.unit_width * node.level + xOffset, yValues[node.level] * this.unit_height);
            y++;
        });
    }
    Position_Subjects() { } //Or a general one for clusters
    Clean_Up_Unseleected() { }
    ;
}
NetworkComponent.ɵfac = function NetworkComponent_Factory(t) { return new (t || NetworkComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_unit_service__WEBPACK_IMPORTED_MODULE_3__["UnitService"])); };
NetworkComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: NetworkComponent, selectors: [["app-network"]], viewQuery: function NetworkComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c1, true);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.networkContainer = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.popOver = _t.first);
    } }, decls: 4, vars: 0, consts: [["id", "mynetwork"], ["siteConfigNetwork", ""], [3, "searchEvent"], [3, "resetEvent"]], template: function NetworkComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "app-search-bar", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("searchEvent", function NetworkComponent_Template_app_search_bar_searchEvent_2_listener($event) { return ctx.Search($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "app-reset-button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("resetEvent", function NetworkComponent_Template_app_reset_button_resetEvent_3_listener($event) { return ctx.Reset_Graph($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_components_search_bar_search_bar_component__WEBPACK_IMPORTED_MODULE_4__["SearchBarComponent"], _components_reset_button_reset_button_component__WEBPACK_IMPORTED_MODULE_5__["ResetButtonComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJuZXR3b3JrLmNvbXBvbmVudC5jc3MifQ== */", "#mynetwork[_ngcontent-%COMP%] {\n      width: 100vw;\n      height: 90vh;\n      border: 1px solid lightgray;\n    }"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NetworkComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-network',
                templateUrl: './network.component.html',
                styleUrls: ['./network.component.css']
            }]
    }], function () { return [{ type: _services_unit_service__WEBPACK_IMPORTED_MODULE_3__["UnitService"] }]; }, { networkContainer: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ["siteConfigNetwork"]
        }], popOver: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ["pop"]
        }] }); })();


/***/ }),

/***/ "OcBZ":
/*!******************************************!*\
  !*** ./src/app/services/unit.service.ts ***!
  \******************************************/
/*! exports provided: UnitService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnitService", function() { return UnitService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/environment */ "AytR");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");




class UnitService {
    constructor(http) {
        this.http = http;
        this.apiServerUrl = src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].api_base_Url;
    }
    getUnits() {
        return this.http.get(`${this.apiServerUrl}/unit/all/`);
    }
    getSubjects(school = null) {
        var extension = "/?school=" + school;
        if (school) {
            return this.http.get(`${this.apiServerUrl}/unit/programmes${extension}`);
        }
        else {
            return this.http.get(`${this.apiServerUrl}/unit/programmes`);
        }
    }
    getSchools(faculty = null) {
        var extension = "/?school=" + faculty;
        if (faculty) {
            return this.http.get(`${this.apiServerUrl}/unit/schools${extension}`);
        }
        else {
            return this.http.get(`${this.apiServerUrl}/unit/schools`);
        }
    }
    getFaculties() {
        return this.http.get(`${this.apiServerUrl}/unit/faculties`);
    }
    getTopics(subject) {
        return this.http.get(`${this.apiServerUrl}/unit/faculties`);
    }
}
UnitService.ɵfac = function UnitService_Factory(t) { return new (t || UnitService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"])); };
UnitService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: UnitService, factory: UnitService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UnitService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "OlVi":
/*!*******************************************************************!*\
  !*** ./src/app/components/reset-button/reset-button.component.ts ***!
  \*******************************************************************/
/*! exports provided: ResetButtonComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetButtonComponent", function() { return ResetButtonComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class ResetButtonComponent {
    constructor() {
        this.resetEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ngOnInit() {
    }
    send_reset() {
        var signal = "reset";
        this.resetEvent.emit(signal);
    }
}
ResetButtonComponent.ɵfac = function ResetButtonComponent_Factory(t) { return new (t || ResetButtonComponent)(); };
ResetButtonComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ResetButtonComponent, selectors: [["app-reset-button"]], outputs: { resetEvent: "resetEvent" }, decls: 2, vars: 0, consts: [["id", "sb", 1, "button", 3, "click"]], template: function ResetButtonComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ResetButtonComponent_Template_button_click_0_listener() { return ctx.send_reset(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "reset");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".button[_ngcontent-%COMP%] {\n\tcolor: #fff !important;\n\ttext-transform: uppercase;\n\ttext-decoration: none;\n\tbackground: #ed3330;\n\tpadding: 10px;\n\tborder-radius: 5px;\n\tdisplay: inline-block;\n\tborder: none;\n\ttransition: all 0.4s ease 0s;\n  position: absolute;\n  top: 20px;\n  left: 20px;\n}\n.button[_ngcontent-%COMP%]:hover {\n\tbackground: #434343;\n\tletter-spacing: 1px;\n\tbox-shadow: 5px 40px -10px rgba(0,0,0,0.57);\n\ttransition: all 0.4s ease 0s;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc2V0LWJ1dHRvbi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0NBQ0Msc0JBQXNCO0NBQ3RCLHlCQUF5QjtDQUN6QixxQkFBcUI7Q0FDckIsbUJBQW1CO0NBQ25CLGFBQWE7Q0FDYixrQkFBa0I7Q0FDbEIscUJBQXFCO0NBQ3JCLFlBQVk7Q0FDWiw0QkFBNEI7RUFDM0Isa0JBQWtCO0VBQ2xCLFNBQVM7RUFDVCxVQUFVO0FBQ1o7QUFDQTtDQUNDLG1CQUFtQjtDQUNuQixtQkFBbUI7Q0FHbkIsMkNBQTJDO0NBQzNDLDRCQUE0QjtBQUM3QiIsImZpbGUiOiJyZXNldC1idXR0b24uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5idXR0b24ge1xuXHRjb2xvcjogI2ZmZiAhaW1wb3J0YW50O1xuXHR0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuXHR0ZXh0LWRlY29yYXRpb246IG5vbmU7XG5cdGJhY2tncm91bmQ6ICNlZDMzMzA7XG5cdHBhZGRpbmc6IDEwcHg7XG5cdGJvcmRlci1yYWRpdXM6IDVweDtcblx0ZGlzcGxheTogaW5saW5lLWJsb2NrO1xuXHRib3JkZXI6IG5vbmU7XG5cdHRyYW5zaXRpb246IGFsbCAwLjRzIGVhc2UgMHM7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAyMHB4O1xuICBsZWZ0OiAyMHB4O1xufVxuLmJ1dHRvbjpob3ZlciB7XG5cdGJhY2tncm91bmQ6ICM0MzQzNDM7XG5cdGxldHRlci1zcGFjaW5nOiAxcHg7XG5cdC13ZWJraXQtYm94LXNoYWRvdzogMHB4IDVweCA0MHB4IC0xMHB4IHJnYmEoMCwwLDAsMC41Nyk7XG5cdC1tb3otYm94LXNoYWRvdzogMHB4IDVweCA0MHB4IC0xMHB4IHJnYmEoMCwwLDAsMC41Nyk7XG5cdGJveC1zaGFkb3c6IDVweCA0MHB4IC0xMHB4IHJnYmEoMCwwLDAsMC41Nyk7XG5cdHRyYW5zaXRpb246IGFsbCAwLjRzIGVhc2UgMHM7XG59XG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ResetButtonComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-reset-button',
                templateUrl: './reset-button.component.html',
                styleUrls: ['./reset-button.component.css']
            }]
    }], function () { return []; }, { resetEvent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _network_network_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./network/network.component */ "EilE");



//mport { Unit } from './unit';
class AppComponent {
    constructor() {
        //public units: Unit[];
        //public editEmployee: Unit;
        //public deleteEmployee: Unit;
        this.title = "Front End";
    }
    ngOnInit() {
        // this.getUnits();
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 8, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "html");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "head");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "SuSy Knower - Knowledge Maps");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "body");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "app-network");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_network_network_component__WEBPACK_IMPORTED_MODULE_1__["NetworkComponent"]], styles: ["* {\n    margin: 0;\n    padding: 0;\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksU0FBUztJQUNULFVBQVU7RUFDWiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIjo6bmctZGVlcCAqIHtcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogMDtcbiAgfSJdfQ== */", "#infoPanel[_ngcontent-%COMP%] {\n      float: right;\n      width: 320px;\n      padding: 10px;\n      border: 5px solid gray;\n      margin: 0;\n    }"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _services_unit_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/unit.service */ "OcBZ");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _components_search_bar_search_bar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/search-bar/search-bar.component */ "lCy9");
/* harmony import */ var _network_network_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./network/network.component */ "EilE");
/* harmony import */ var _components_reset_button_reset_button_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/reset-button/reset-button.component */ "OlVi");









class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [_services_unit_service__WEBPACK_IMPORTED_MODULE_0__["UnitService"]], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
        _components_search_bar_search_bar_component__WEBPACK_IMPORTED_MODULE_5__["SearchBarComponent"],
        _network_network_component__WEBPACK_IMPORTED_MODULE_6__["NetworkComponent"],
        _components_reset_button_reset_button_component__WEBPACK_IMPORTED_MODULE_7__["ResetButtonComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                    _components_search_bar_search_bar_component__WEBPACK_IMPORTED_MODULE_5__["SearchBarComponent"],
                    _network_network_component__WEBPACK_IMPORTED_MODULE_6__["NetworkComponent"],
                    _components_reset_button_reset_button_component__WEBPACK_IMPORTED_MODULE_7__["ResetButtonComponent"],
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                ],
                providers: [_services_unit_service__WEBPACK_IMPORTED_MODULE_0__["UnitService"]],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "lCy9":
/*!***************************************************************!*\
  !*** ./src/app/components/search-bar/search-bar.component.ts ***!
  \***************************************************************/
/*! exports provided: SearchBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchBarComponent", function() { return SearchBarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class SearchBarComponent {
    constructor() {
        this.searchEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ngOnInit() {
    }
    send_search() {
        var inputVal = document.getElementById("myInput").value;
        console.log(inputVal);
        console.log("searching...");
        this.searchEvent.emit(inputVal);
    }
}
SearchBarComponent.ɵfac = function SearchBarComponent_Factory(t) { return new (t || SearchBarComponent)(); };
SearchBarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SearchBarComponent, selectors: [["app-search-bar"]], outputs: { searchEvent: "searchEvent" }, decls: 5, vars: 0, consts: [["id", "searchUsers", 1, "instant-search", "instant-search--loading"], [2, "text-align", "center"], ["type", "text", "placeholder", "Search for a unit", "id", "myInput", "spellcheck", "false", 1, "instant-search__input"], ["id", "sb", 1, "circle", 3, "click"]], template: function SearchBarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SearchBarComponent_Template_button_click_4_listener() { return ctx.send_search(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["h2[_ngcontent-%COMP%] {\n    color: red;\n    text-align:left;\n    font-family: Tahoma, Verdana, sans-serif;\n  }\n  p[_ngcontent-%COMP%] {\n    font-family: Tahoma, Verdana, sans-serif;\n    font-size: small;\n  }\n  label[_ngcontent-%COMP%]{\n    font-family: Tahoma, Verdana, sans-serif;\n    font-size: small;\n  }\n  .instant-search[_ngcontent-%COMP%] {\n    position: relative;\n    max-width: 250px;\n  }\n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  \n  .instant-search--loading[_ngcontent-%COMP%]::after {\n    content: \"\";\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 2px;\n    background: #696969;\n    border-radius: 5px;\n    animation: searchIndicator 2s infinite ease-in-out;\n  }\n  @keyframes searchIndicator {\n    0% {\n      width: 15%;\n    }\n    50% {\n      width: 100%;\n    }\n    100% {\n      width: 15%;\n    }\n  }\n  .instant-search[_ngcontent-%COMP%], .instant-search__input-container[_ngcontent-%COMP%] {\n    border-radius: 5px;\n  }\n  .instant-search__input-container[_ngcontent-%COMP%] {\n    display: inline-flex;\n    box-sizing: border-box;\n    width: 100%;\n    padding: 6px;\n    background: #eeeeee;\n  }\n  .instant-search__input-container[_ngcontent-%COMP%]:focus-within {\n    background: #ffffff;\n  }\n  .instant-search__input[_ngcontent-%COMP%] {\n    flex-grow: 1;\n    border: none;\n    outline: none;\n    width: 100%;\n    padding: 0 6px;\n    background: transparent;\n  }\n  \n  \n  \n  \n  \n  \n  \n  .instant-search__results-container--visible[_ngcontent-%COMP%] {\n    visibility: visible;\n    opacity: 1;\n  }\n  .instant-search__result[_ngcontent-%COMP%] {\n    display: block;\n    color: #333333;\n    text-decoration: none;\n    padding: 10px;\n    font-size: 0.8em;\n    cursor: pointer;\n  }\n  .instant-search__result[_ngcontent-%COMP%]:hover {\n    background: #eeeeee;\n  }\n  .instant-search__result[_ngcontent-%COMP%]:not(:last-of-type) {\n    border-bottom: 1px solid #eeeeee;\n  }\n  \n  \n  \n  \n  \n  \n  \n  \n  .circle[_ngcontent-%COMP%]{\n    position: relative;\n    top: -8px;\n    left: 108px;\n    width: 30px;\n    height: 30px;\n    margin-top: -9%;\n    border-width: 6px;\n    \n    background-color: transparent;\n    border-radius: 50%;\n    transition: 0.5s ease all;\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC1iYXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7SUFDSSxVQUFVO0lBQ1YsZUFBZTtJQUNmLHdDQUF3QztFQUMxQztFQUNBO0lBQ0Usd0NBQXdDO0lBQ3hDLGdCQUFnQjtFQUNsQjtFQUNBO0lBQ0Usd0NBQXdDO0lBQ3hDLGdCQUFnQjtFQUNsQjtFQUdBO0lBQ0Usa0JBQWtCO0lBQ2xCLGdCQUFnQjtFQUNsQjtFQUdBLG1CQUFtQjtFQUNuQiwyQkFBMkI7RUFDM0IsNkJBQTZCO0VBQzdCLElBQUk7RUFFSix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLHNCQUFzQjtFQUN0QixvREFBb0Q7RUFDcEQsSUFBSTtFQUVKLGlDQUFpQztFQUNqQyw0Q0FBNEM7RUFDNUMsSUFBSTtFQUVKLHdCQUF3QjtFQUN4QjtJQUNFLFdBQVc7SUFDWCxrQkFBa0I7SUFDbEIsTUFBTTtJQUNOLE9BQU87SUFDUCxXQUFXO0lBQ1gsbUJBQW1CO0lBQ25CLGtCQUFrQjtJQUNsQixrREFBa0Q7RUFDcEQ7RUFFQTtJQUNFO01BQ0UsVUFBVTtJQUNaO0lBQ0E7TUFDRSxXQUFXO0lBQ2I7SUFDQTtNQUNFLFVBQVU7SUFDWjtFQUNGO0VBRUE7O0lBRUUsa0JBQWtCO0VBQ3BCO0VBRUE7SUFDRSxvQkFBb0I7SUFDcEIsc0JBQXNCO0lBQ3RCLFdBQVc7SUFDWCxZQUFZO0lBQ1osbUJBQW1CO0VBQ3JCO0VBRUE7SUFDRSxtQkFBbUI7RUFDckI7RUFFQTtJQUNFLFlBQVk7SUFDWixZQUFZO0lBQ1osYUFBYTtJQUNiLFdBQVc7SUFDWCxjQUFjO0lBQ2QsdUJBQXVCO0VBQ3pCO0VBRUEsdUNBQXVDO0VBQ3ZDLHVCQUF1QjtFQUN2QixzQkFBc0I7RUFDdEIsd0JBQXdCO0VBQ3hCLGdCQUFnQjtFQUNoQiwrQ0FBK0M7RUFDL0MsSUFBSTtFQUVKO0lBQ0UsbUJBQW1CO0lBQ25CLFVBQVU7RUFDWjtFQUVBO0lBQ0UsY0FBYztJQUNkLGNBQWM7SUFDZCxxQkFBcUI7SUFDckIsYUFBYTtJQUNiLGdCQUFnQjtJQUNoQixlQUFlO0VBQ2pCO0VBRUE7SUFDRSxtQkFBbUI7RUFDckI7RUFFQTtJQUNFLGdDQUFnQztFQUNsQztFQUVBLDJCQUEyQjtFQUMzQixzQkFBc0I7RUFDdEIsdUJBQXVCO0VBQ3ZCLElBQUk7RUFFSiwrQkFBK0I7RUFDL0Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQixJQUFJO0VBRUo7SUFDRSxrQkFBa0I7SUFDbEIsU0FBUztJQUNULFdBQVc7SUFDWCxXQUFXO0lBQ1gsWUFBWTtJQUNaLGVBQWU7SUFDZixpQkFBaUI7SUFDakIsMkJBQTJCO0lBQzNCLDZCQUE2QjtJQUM3QixrQkFBa0I7SUFDbEIseUJBQXlCO0VBQzNCIiwiZmlsZSI6InNlYXJjaC1iYXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaDIge1xuICAgIGNvbG9yOiByZWQ7XG4gICAgdGV4dC1hbGlnbjpsZWZ0O1xuICAgIGZvbnQtZmFtaWx5OiBUYWhvbWEsIFZlcmRhbmEsIHNhbnMtc2VyaWY7XG4gIH1cbiAgcCB7XG4gICAgZm9udC1mYW1pbHk6IFRhaG9tYSwgVmVyZGFuYSwgc2Fucy1zZXJpZjtcbiAgICBmb250LXNpemU6IHNtYWxsO1xuICB9XG4gIGxhYmVse1xuICAgIGZvbnQtZmFtaWx5OiBUYWhvbWEsIFZlcmRhbmEsIHNhbnMtc2VyaWY7XG4gICAgZm9udC1zaXplOiBzbWFsbDtcbiAgfVxuICBcbiAgXG4gIC5pbnN0YW50LXNlYXJjaCB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIG1heC13aWR0aDogMjUwcHg7XG4gIH1cbiAgXG4gIFxuICAvKi5pbnN0YW50LXNlYXJjaCwqL1xuICAvKi5pbnN0YW50LXNlYXJjaF9faW5wdXQgeyovXG4gIC8qICBmb250LWZhbWlseTogc2Fucy1zZXJpZjsqL1xuICAvKn0qL1xuICBcbiAgLyp0aGF0IHRyYW5zcGFyZW50IGJveCovXG4gIC8qLmluc3RhbnQtc2VhcmNoLCovXG4gIC8qLmluc3RhbnQtc2VhcmNoICogeyovXG4gIC8qICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMTVzLCBib3gtc2hhZG93IDAuMTVzOyovXG4gIC8qfSovXG4gIFxuICAvKi5pbnN0YW50LXNlYXJjaDpmb2N1cy13aXRoaW4geyovXG4gIC8qICBib3gtc2hhZG93OiAwIDAgM3B4IHJnYmEoMCwgMCwgMCwgMC4yKTsqL1xuICAvKn0qL1xuICBcbiAgLyp0aGF0IGZsdWN0dWF0aW5nIGxpbmUqL1xuICAuaW5zdGFudC1zZWFyY2gtLWxvYWRpbmc6OmFmdGVyIHtcbiAgICBjb250ZW50OiBcIlwiO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICBoZWlnaHQ6IDJweDtcbiAgICBiYWNrZ3JvdW5kOiAjNjk2OTY5O1xuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICBhbmltYXRpb246IHNlYXJjaEluZGljYXRvciAycyBpbmZpbml0ZSBlYXNlLWluLW91dDtcbiAgfVxuICBcbiAgQGtleWZyYW1lcyBzZWFyY2hJbmRpY2F0b3Ige1xuICAgIDAlIHtcbiAgICAgIHdpZHRoOiAxNSU7XG4gICAgfVxuICAgIDUwJSB7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICB9XG4gICAgMTAwJSB7XG4gICAgICB3aWR0aDogMTUlO1xuICAgIH1cbiAgfVxuICBcbiAgLmluc3RhbnQtc2VhcmNoLFxuICAuaW5zdGFudC1zZWFyY2hfX2lucHV0LWNvbnRhaW5lciB7XG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICB9XG4gIFxuICAuaW5zdGFudC1zZWFyY2hfX2lucHV0LWNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBwYWRkaW5nOiA2cHg7XG4gICAgYmFja2dyb3VuZDogI2VlZWVlZTtcbiAgfVxuICBcbiAgLmluc3RhbnQtc2VhcmNoX19pbnB1dC1jb250YWluZXI6Zm9jdXMtd2l0aGluIHtcbiAgICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICB9XG4gIFxuICAuaW5zdGFudC1zZWFyY2hfX2lucHV0IHtcbiAgICBmbGV4LWdyb3c6IDE7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIG91dGxpbmU6IG5vbmU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgcGFkZGluZzogMCA2cHg7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIH1cbiAgXG4gIC8qLmluc3RhbnQtc2VhcmNoX19yZXN1bHRzLWNvbnRhaW5lciB7Ki9cbiAgLyogIG1heC1oZWlnaHQ6IDI1MHB4OyovXG4gIC8qICBvdmVyZmxvdy15OiBhdXRvOyovXG4gIC8qICB2aXNpYmlsaXR5OiBoaWRkZW47Ki9cbiAgLyogIG9wYWNpdHk6IDA7Ki9cbiAgLyogIHRyYW5zaXRpb246IHZpc2liaWxpdHkgMC4xcywgb3BhY2l0eSAwLjFzOyovXG4gIC8qfSovXG4gIFxuICAuaW5zdGFudC1zZWFyY2hfX3Jlc3VsdHMtY29udGFpbmVyLS12aXNpYmxlIHtcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbiAgXG4gIC5pbnN0YW50LXNlYXJjaF9fcmVzdWx0IHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBjb2xvcjogIzMzMzMzMztcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgcGFkZGluZzogMTBweDtcbiAgICBmb250LXNpemU6IDAuOGVtO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxuICBcbiAgLmluc3RhbnQtc2VhcmNoX19yZXN1bHQ6aG92ZXIge1xuICAgIGJhY2tncm91bmQ6ICNlZWVlZWU7XG4gIH1cbiAgXG4gIC5pbnN0YW50LXNlYXJjaF9fcmVzdWx0Om5vdCg6bGFzdC1vZi10eXBlKSB7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlZWVlZWU7XG4gIH1cbiAgXG4gIC8qLmluc3RhbnQtc2VhcmNoX190aXRsZSB7Ki9cbiAgLyogIGZvbnQtc2l6ZTogMS4xZW07Ki9cbiAgLyogIGZvbnQtd2VpZ2h0OiBib2xkOyovXG4gIC8qfSovXG4gIFxuICAvKi5pbnN0YW50LXNlYXJjaF9fcGFyYWdyYXBoIHsqL1xuICAvKiAgbGluZS1oZWlnaHQ6IDEuNTsqL1xuICAvKiAgbWFyZ2luOiA4cHggMDsqL1xuICAvKn0qL1xuICBcbiAgLmNpcmNsZXtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgdG9wOiAtOHB4O1xuICAgIGxlZnQ6IDEwOHB4O1xuICAgIHdpZHRoOiAzMHB4O1xuICAgIGhlaWdodDogMzBweDtcbiAgICBtYXJnaW4tdG9wOiAtOSU7XG4gICAgYm9yZGVyLXdpZHRoOiA2cHg7XG4gICAgLypib3JkZXI6IDE1cHggc29saWQgI2ZmZjsqL1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICB0cmFuc2l0aW9uOiAwLjVzIGVhc2UgYWxsO1xuICB9XG4gICJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SearchBarComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-search-bar',
                templateUrl: './search-bar.component.html',
                styleUrls: ['./search-bar.component.css']
            }]
    }], function () { return []; }, { searchEvent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map