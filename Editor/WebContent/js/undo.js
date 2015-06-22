
		(function ($, Backbone, _) {
			 undoManager = new Backbone.UndoManager({
				track: true,
				register:[graph,window.newsbox]
			});
			 

			 
			 
			 Backbone.UndoManager.removeUndoType("change");
			 Backbone.UndoManager.removeUndoType("add");
			 Backbone.UndoManager.removeUndoType("remove");

			 Backbone.UndoManager.addUndoType("change:isChanging", {
			 	"on": function (model, isChanging, options) {
			 		
			 		if(!addLink){
			 			
			 		if (isChanging) {
			 			if (before==null) {

			 				before = model.toJSON();
			 				console.log("Start Changing FROM "+JSON.stringify(before));
			 			}			
			 		} else {
			 			stored_before=before;
			 			stored_after=model.toJSON();
			 			before = null;
			 			
			 			console.log("TO "+JSON.stringify(stored_after));
			 			
			 			return {
			 				"object": model,
			 				"before": stored_before,
			 				"after": stored_after
			 			}
			 		}
			 		}
			 	},
			 	"undo": function (model, before, after, options) {
			 		console.log("preparing undo "+JSON.stringify(before));

			 		model.set(before);
			 		//model.trigger();
			 		var beforeString=JSON.stringify(before);
					var pos  =beforeString.search("vertices");
			 		if(pos<0)
			 			model.set("vertices","");
//			 		if(vertices)
//						model.set("vertices","");
			 		model.set("isChanging",false);
			 	},
			 	"redo": function (model, before, after, options) {
			 		console.log("preparing redo "+JSON.stringify(after));
			 		model.set(after);
			 		model.set("isChanging",false);
			 	}
			 });


			 Backbone.UndoManager.addUndoType("change:isChangingProperty", {
				 	"on": function (model, isChangingProperty, options) {
				 		if (isChangingProperty) {
				 			if (before==null) {
				 				before = model.toJSON();
				 				console.log("Start ChangingProperty FROM "+JSON.stringify(before));
				 			}			
				 		} else {
				 			stored_before=before;
				 			stored_after=model.toJSON();
				 			before = null;
				 			
				 			console.log("TO "+JSON.stringify(stored_after));
				 			
				 			return {
				 				"object": model,
				 				"before": stored_before,
				 				"after": stored_after
				 			}
				 		}
				 	},
				 	"undo": function (model, before, after, options) {
				 		console.log("preparing undo "+JSON.stringify(before));
				 		
				 		model.set(before);
				 		model.set("isChangingProperty",false);
				 	},
				 	"redo": function (model, before, after, options) {
				 		console.log("preparing redo "+JSON.stringify(after));
				 		model.set(after);
				 		model.set("isChangingProperty",false);
				 	}
				 });
			 
//			 Backbone.UndoManager.addUndoType("change:isAdded", {
//				 	"on": function (model, isAdded, options) {
//				 		console.log("UNDO MANAGER IS ADDED")
//				 		if (isAdded) {
//				 			if (before==null) {
//				 				before = model.toJSON();
//				 				console.log("Start ChangingProperty FROM "+JSON.stringify(before));
//				 				model.set("isAdded",false);
//				 			}			
//				 		} else {
//				 			stored_before=before;
//				 			stored_after=model.toJSON();
//				 			before = null;
//				 			
//				 			console.log("TO "+JSON.stringify(stored_after));
//				 			
//				 			return {
//				 				"object": model,
//				 				"before": stored_before,
//				 				"after": stored_after
//				 			}
//				 		}
//				 	},
//				 	"undo": function (model, before, after, options) {
//				 		console.log("preparing undo "+JSON.stringify(before));
//				 		
//				 		model.set(before);
//				 		model.set("isAdded",false);
//				 	},
//				 	"redo": function (model, before, after, options) {
//				 		console.log("preparing redo "+JSON.stringify(after));
//				 		model.set(after);
//				 		model.set("isAdded",false);
//				 	}
//				 });
			 Backbone.UndoManager.addUndoType("add", {
				 	"on": function (model, cell, options) {
				 		console.log("UNDO MANAGER ADDED")
				 		
				 		
							
									console.log("Start ADD TO "+JSON.stringify(model.toJSON()));
									return {
										"object": model,
										"before": cell,
										"after": model.toJSON()
									}
				 		
				 	},
				 	"undo": function (model, before, after, options) {
				 		console.log("preparing undo "+JSON.stringify(before));
				 	
				 		model.remove(before);
				 		
				 	},
				 	"redo": function (model, before, after, options) {
				 		console.log("preparing redo "+JSON.stringify(after));
				 		console.log(after);
				 		console.log("MODEL: "+model);
				 		graph.addCell(after);
				 		model.set(after);
				 		
				 	}
				 });
			 
			 Backbone.UndoManager.addUndoType("remove", {
				 	"on": function (model, cell, options) {
				 		console.log("UNDO MANAGER REMOVE")
				 		
				 		
							
									console.log("Start ADD TO "+JSON.stringify(model.toJSON()));
									return {
										"object": model,
										"before": model.toJSON(),
										"after": cell
									}
				 		
				 	},
				 	"undo": function (model, before, after, options) {
				 		console.log("preparing undo Remove "+JSON.stringify(before));
				 		graph.addCell(before);
				 		
				 		
				 	},
				 	"redo": function (model, before, after, options) {
				 		console.log("preparing redo Remove "+JSON.stringify(after));
				 		console.log(after);
				 		console.log("MODEL: "+model);
				 		model.remove(before);
				 		//model.set(after);
				 		
				 	}
				 });
			 
//			 Backbone.UndoManager.addUndoType("change:isChangingTargetLink", {
//				 	"on": function (model, isChangingTargetLink, options) {
//				 		if (isChangingTargetLink) {
//				 			if (before==null) {
//				 				before = model.toJSON();
//				 				console.log("Start isChangingTargetLink FROM "+JSON.stringify(before));
//				 			}			
//				 		} else {
//				 			stored_before=before;
//				 			stored_after=model.toJSON();
//				 			before = null;
//				 			
//				 			console.log("TO "+JSON.stringify(stored_after));
//				 			
//				 			return {
//				 				"object": model,
//				 				"before": stored_before,
//				 				"after": stored_after
//				 			}
//				 		}
//				 	},
//				 	"undo": function (model, before, after, options) {
//				 		console.log("preparing undo "+JSON.stringify(before));
//				 		model.set(before);
//				 		model.set("isChangingTargetLink",false);
//				 	},
//				 	"redo": function (model, before, after, options) {
//				 		console.log("preparing redo "+JSON.stringify(after));
//				 		model.set(after);
//				 		model.set("isChangingTargetLink",false);
//				 	}
//				 });


			$(".undo-button").click(function () {
				console.log("UNDO CLICK");
			//	deselectAllElements();
			//	$('#newsbox').hide();
				undoManager.undo();
			});
			$(".redo-button").click(function () {
				console.log("REDO CLICK");
			//	deselectAllElements();
				undoManager.redo();
			});
			
		})(window.jQuery, window.Backbone, window._);