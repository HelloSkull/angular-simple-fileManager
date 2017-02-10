angular.module("fb").run(["$templateCache", function($templateCache) {$templateCache.put("src/js/directives/templates/fb-attr.html","<div class=\"fb-attr\">\r\n    <form sf-schema=\"fbSchema\" sf-form=\"fbForm\" sf-model=\"fbModel\" name=\"fbSchemaForm\" layout=\"column\" ng-submit=\"onSubmit(fbSchemaForm)\"></form>\r\n</div>");
$templateCache.put("src/js/directives/templates/fb-list-title-right-click.html","<div class=\"fb-right-click\" role=\"listbox\">\r\n    <div class=\"menu-item\"\r\n         ng-click=\"item.show = !item.show\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple\r\n         ng-repeat=\"item in vm.items\">\r\n        <md-checkbox ng-checked=\"item.show\" class=\"md-primary\">\r\n            {{ item.showName }}\r\n        </md-checkbox>\r\n    </div>\r\n</div>");
$templateCache.put("src/js/directives/templates/fb-list.html","<div class=\"fb-list\" layout=\"column\" flex>\r\n    <div layout=\"row\" layout-align=\"space-between center\" class=\"fb-list-toolbar\" md-whiteframe=\"1\">\r\n        <div class=\"fb-list-nav\" flex layout=\"row\" layout-align=\"start center\" ng-show=\"!inEditPath\">\r\n            <div layout=\"row\" layout-align=\"start center\" flex=\"nogrow\">\r\n                <md-button ng-click=\"loadPath()\">根目录</md-button>\r\n                <div layout=\"row\" layout-align=\"start center\" ng-repeat=\"item in fbPathNodes\" class=\"fb-list-nav-item\">\r\n                    <md-icon>keyboard_arrow_right</md-icon>\r\n                    <md-button ng-click=\"loadPath(item)\" ng-if=\"!$last\">{{item.fbInfo.pathName}}</md-button>\r\n                    <span ng-if=\"$last\">{{item.fbInfo.pathName}}</span>\r\n                </div>\r\n            </div>\r\n            <md-button class=\"md-icon-button\" ng-click=\"editPath()\"><md-icon>edit</md-icon></md-button>\r\n        </div>\r\n        <div class=\"fb-list-nav\" flex layout=\"row\" layout-align=\"start center\" ng-show=\"inEditPath\">\r\n            <md-input-container md-no-float class=\"md-block\" flex>\r\n                <md-icon>edit</md-icon>\r\n                <input id=\"path-editor\" type=\"text\" ng-model=\"nowPath\" placeholder=\"请输入要打开的目录\" ng-keyup=\"goPath($event)\" ng-blur=\"leaveEditPath()\" onfocus=\"this.select()\">\r\n            </md-input-container>\r\n        </div>\r\n        <div flex=\"none\" layout=\"row\" layout-align=\"end center\" class=\"fb-list-search\" ng-show=\"fbSearchNodeFilter\">\r\n            <md-input-container md-no-float>\r\n                <md-icon>search</md-icon>\r\n                <input ng-model=\"searchText\" type=\"text\" placeholder=\"本地搜索\" ng-keyup=\"searchNode($event)\">\r\n            </md-input-container>\r\n        </div>\r\n    </div>\r\n    <div flex layout=\"column\" ng-if=\"fbView == \'list\'\">\r\n        <div id=\"fb-list-item-title\">\r\n            <div class=\"fb-list-item-title\" layout=\"row\" layout-align=\"start center\" ng-right-click=\"rightClickTitle($event)\"\r\n                as-sortable=\"dragControlListeners\" ng-model=\"fbNodeConfig\">\r\n                <div ng-click=\"sort(item.name)\" md-ink-ripple layout=\"row\" ng-repeat=\"item in fbNodeConfig\" ng-if=\"item.show && !fbResizeable\"\r\n                     ng-class=\"{\'layout-align-end-center\':isLastTitle(item)}\" as-sortable-item flex=\"{{item.flex}}\">\r\n                    <div as-sortable-item-handle></div>\r\n                    <span flex=\"nogrow\">{{item.showName}}</span>\r\n                    <md-icon ng-if=\"sortItem == item.name\">{{sortBy == \'asc\' ? \'arrow_upward\':\'arrow_downward\'}}</md-icon>\r\n                </div>\r\n                <div ng-click=\"sort(item.name)\" md-ink-ripple layout=\"row\" ng-repeat=\"item in fbNodeConfig\" ng-if=\"item.show && fbResizeable\"\r\n                     as-sortable-item resizable r-directions=\"[\'right\']\" r-width=\"item.width || 100\">\r\n                    <div as-sortable-item-handle></div>\r\n                    <span flex=\"nogrow\">{{item.showName}}</span>\r\n                    <md-icon ng-if=\"sortItem == item.name\">{{sortBy == \'asc\' ? \'arrow_upward\':\'arrow_downward\'}}</md-icon>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <md-virtual-repeat-container fb-area-select ng-model=\"allNode\" class=\"fb-list-list-container\" md-top-index=\"topIndex\" flex ng-right-click=\"rightClickItem(null,$event)\" ng-click=\"clickEmpty($event)\">\r\n            <div md-virtual-repeat=\"item in allNode\" md-item-size=\"20\">\r\n                <div class=\"fb-list-item\" ng-right-click=\"rightClickItem(item,$event,$index)\"\r\n                     ng-class=\"{\'fb-list-item-select\':isSelectedNode(item),\'fb-list-item-last-select\':$index == fbLastSelectNodesIndex}\"\r\n                     ng-click=\"click(item,$event,$index)\" ng-dblclick=\"getChildren(item)\" md-ink-ripple>\r\n                    <div layout=\"row\" layout-align=\"start center\" class=\"fb-list-item-inner\">\r\n                        <div style=\"text-align: left;\" ng-style=\"{\'width\':it.width || 100}\" ng-repeat=\"it in fbNodeConfig\" ng-if=\"it.show && fbResizeable\">\r\n                            <md-icon ng-class=\"{\'icon-rotate\':item.isLoading}\" ng-if=\"isFirstField(it)\">{{getItemStatus(item)}}</md-icon>\r\n                            {{it.getData(item)}}\r\n                        </div>\r\n                        <div flex=\"{{it.flex}}\" ng-repeat=\"it in fbNodeConfig\" ng-if=\"it.show && !fbResizeable\">\r\n                            <md-icon ng-class=\"{\'icon-rotate\':item.isLoading}\" ng-if=\"isFirstField(it)\">{{getItemStatus(item)}}</md-icon>\r\n                            {{it.getData(item)}}\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </md-virtual-repeat-container>\r\n    </div>\r\n    <div flex layout=\"column\" ng-if=\"fbView == \'grid\'\">\r\n        <md-virtual-repeat-container class=\"fb-list-grid-container\"  md-top-index=\"topIndex\" flex ng-right-click=\"rightClickItem(null,$event)\" ng-click=\"clickEmpty($event)\">\r\n            <div md-virtual-repeat=\"item0 in allGridNode\" md-item-size=\"20\" layout=\"row\" layout-align=\"start start\">\r\n                <div ng-repeat=\"item in item0\" class=\"fb-list-item\" ng-right-click=\"rightClickItem(item,$event,$index)\"\r\n                     ng-class=\"{\'fb-list-item-select\':isSelectedNode(item),\'fb-list-item-select-multi\':fbSelectNodes.length > 1,\'fb-list-item-last-select\':isLastClickNode(item)}\" layout=\"column\"\r\n                     ng-include=\"fbListItemGridTemplateUrl\"\r\n                     ng-click=\"click(item,$event)\" ng-dblclick=\"getChildren(item)\" md-ink-ripple>\r\n                </div>\r\n            </div>\r\n        </md-virtual-repeat-container>\r\n    </div>\r\n</div>");
$templateCache.put("src/js/directives/templates/fb-tree.html","<div flex layout=\"column\" class=\"fb-tree\">\r\n    <md-virtual-repeat-container  md-top-index=\"topIndex\" flex>\r\n        <div class=\"fb-tree-item\" ng-class=\"{\'fb-tree-item-select\':item.fbInfo.path == fbSelectNode.path}\" md-virtual-repeat=\"item in allShowNode\"\r\n             md-item-size=\"20\" layout=\"row\" ng-click=\"listNode(item)\" ng-dblclick=\"toggleNode(item,$event)\" ng-right-click=\"rightClickItem(item,$event)\">\r\n            <md-button class=\"md-icon-button\" ng-click=\"toggleNode(item,$event)\" ng-style=\"{\'margin-left\': (item.fbInfo.level * 24 ) + \'px\'}\">\r\n                <md-icon>{{item.fbInfo.isOpen ? \'keyboard_arrow_down\':\'keyboard_arrow_right\'}}</md-icon>\r\n            </md-button>\r\n            <md-button class=\"md-fat\">\r\n                <md-icon ng-class=\"{\'icon-rotate\':item.isLoading}\">{{getItemStatus(item)}}</md-icon>\r\n                <span ng-include=\"fbTreeItemTemplateUrl\"></span>\r\n            </md-button>\r\n        </div>\r\n    </md-virtual-repeat-container>\r\n</div>");
$templateCache.put("src/js/file/templates/dialog-image-preview.html","<md-dialog aria-label=\"Image Preview\" class=\"fb-file\">\r\n    <form ng-cloak>\r\n        <md-toolbar>\r\n            <div class=\"md-toolbar-tools\">\r\n                <h2>图片预览</h2>\r\n                <span flex></span>\r\n                <md-button class=\"md-icon-button\" ng-click=\"vm.cancel()\">\r\n                    <md-icon aria-label=\"Close dialog\">close</md-icon>\r\n                </md-button>\r\n            </div>\r\n        </md-toolbar>\r\n        <md-dialog-content>\r\n            <div class=\"md-dialog-content\">\r\n                <img ng-src=\"{{vm.domain + vm.item.fbInfo.path + \'?op=open\'}}\"/>\r\n            </div>\r\n        </md-dialog-content>\r\n    </form>\r\n</md-dialog>");
$templateCache.put("src/js/file/templates/dialog-text-preview.html","<md-dialog aria-label=\"Text File Preview\" flex=\"80\" flex-gt-lg=\"50\" class=\"fb-file\">\r\n    <form ng-cloak>\r\n        <md-toolbar>\r\n            <div class=\"md-toolbar-tools\">\r\n                <h2>{{vm.item.model.pathSuffix}}</h2>\r\n                <span flex></span>\r\n                <md-button class=\"md-icon-button\" ng-click=\"vm.cancel()\">\r\n                    <md-icon aria-label=\"Close dialog\">close</md-icon>\r\n                </md-button>\r\n            </div>\r\n        </md-toolbar>\r\n        <md-dialog-content>\r\n            <div class=\"md-dialog-content\">\r\n                <div ng-if=\"!vm.inEdit\" class=\"fb-file-content\">\r\n                    {{vm.item.model.content}}\r\n                </div>\r\n                <div ng-if=\"vm.inEdit\">\r\n                    <md-input-container md-no-float class=\"md-block\">\r\n                        <textarea ng-model=\"vm.item.tempModel.content\" rows=\"15\" md-select-on-focus placeholder=\"请输入\"></textarea>\r\n                    </md-input-container>\r\n                </div>\r\n            </div>\r\n        </md-dialog-content>\r\n        <md-dialog-actions layout=\"row\">\r\n            <span flex></span>\r\n            <md-button class=\"md-primary\" ng-click=\"vm.edit(true)\" ng-show=\"!vm.inEdit\">\r\n                编辑\r\n            </md-button>\r\n            <md-button ng-click=\"vm.edit(false)\" ng-show=\"vm.inEdit\">\r\n                取消\r\n            </md-button>\r\n            <md-button class=\"md-primary\" ng-click=\"vm.save()\" ng-show=\"vm.inEdit\">\r\n                保存\r\n            </md-button>\r\n        </md-dialog-actions>\r\n    </form>\r\n</md-dialog>");
$templateCache.put("src/js/file/templates/file-list-grid.html","<md-icon ng-class=\"{\'icon-rotate\':item.isLoading}\">{{getItemStatus(item)}}</md-icon>\r\n<div class=\"fb-list-item-title-container\">{{item.model.pathSuffix}}</div>");
$templateCache.put("src/js/file/templates/file-list-right.html","<md-content flex layout=\"column\">\r\n    <div layout=\"row\" layout-align=\"space-between center\">\r\n        <div layout-padding>\r\n            项目属性\r\n        </div>\r\n        <md-button class=\"md-icon-button\" ng-click=\"vm.closeSidenav()\">\r\n            <md-icon>close</md-icon>\r\n        </md-button>\r\n    </div>\r\n    <md-divider></md-divider>\r\n    <div layout=\"column\" flex>\r\n        <div ng-if=\"vm.selectNodes.length > 1\">\r\n            已选中{{vm.selectNodes.length}}个项目\r\n        </div>\r\n        <div ng-if=\"vm.selectNodes.length == 1 && !vm.selectNodes[0].xAttrEdit\">\r\n            <md-button ng-click=\"vm.selectNodes[0].xAttrEdit = true\">编辑</md-button>\r\n            {{vm.selectNodes[0].model.xAttrs}}\r\n        </div>\r\n        <div ng-if=\"vm.selectNodes.length == 1 && vm.selectNodes[0].xAttrEdit\" layout=\"column\" flex>\r\n            <div layout=\"row\" layout-padding flex=\"none\">\r\n                <span>文件类型：</span>\r\n                <div ng-repeat=\"item in vm.schemas\">\r\n                    <md-checkbox ng-checked=\"vm.schemaExists(item)\" ng-click=\"vm.schemaToggle(item)\" class=\"md-primary\" ng-if=\"item.type != 0\">\r\n                        {{ item.showName }}\r\n                    </md-checkbox>\r\n                </div>\r\n            </div>\r\n            <div flex layout-padding class=\"overflow-auto\">\r\n                <fb-attr fb-model=\"vm.selectNodes[0].xAttr\" ng-model=\"vm.selectNodes[0].config\"></fb-attr>\r\n            </div>\r\n            <md-divider></md-divider>\r\n            <div flex=\"none\" layout=\"row\" layout-align=\"end center\">\r\n                <md-button class=\"md-primary\" ng-click=\"vm.onSubmit()\">保存</md-button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</md-content>");
$templateCache.put("src/js/file/templates/file-right-click-list.html","<div class=\"fb-right-click\" role=\"listbox\">\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'open\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.open()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'open\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple\r\n         ng-if=\"vm.items.length == 1\">\r\n        <md-icon>drafts</md-icon>\r\n        打开\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'delete\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.delete($event)\"\r\n         ng-keydown=\"vm.onKeydown($event, \'delete\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple\r\n         ng-if=\"vm.items.length\">\r\n        <md-icon>delete</md-icon>\r\n        删除\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'rename\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.rename()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'rename\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple\r\n         ng-if=\"vm.items.length\">\r\n        <md-icon>border_color</md-icon>\r\n        重命名\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'download\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.download()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'download\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple\r\n         ng-if=\"vm.items.length\">\r\n        <md-icon>cloud_download</md-icon>\r\n        下载文件\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'cut\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.cut()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'cut\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple\r\n         ng-if=\"vm.items.length\">\r\n        <md-icon>content_cut</md-icon>\r\n        剪切\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'copy\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.copy()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'copy\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple\r\n         ng-if=\"vm.items.length\">\r\n        <md-icon>add_to_photos</md-icon>\r\n        复制\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'paste\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.paste()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'paste\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple\r\n         ng-if=\"vm.copyItems\">\r\n        <md-icon>layers</md-icon>\r\n        粘贴\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'compress\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.compress()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'compress\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple\r\n         ng-if=\"vm.items.length\">\r\n        <md-icon>archive</md-icon>\r\n        压缩\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'uncompress\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.uncompress()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'uncompress\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple\r\n         ng-if=\"vm.items.length\">\r\n        <md-icon>unarchive</md-icon>\r\n        解压\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'show\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.show()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'show\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple\r\n         ng-if=\"vm.items.length\">\r\n        <md-icon>flip_to_front</md-icon>\r\n        显示文件\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'hide\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.hide()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'hide\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple\r\n         ng-if=\"vm.items.length\">\r\n        <md-icon>flip_to_back</md-icon>\r\n        隐藏文件\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'share\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.share()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'share\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple\r\n         ng-if=\"vm.items.length == 1\">\r\n        <md-icon>share</md-icon>\r\n        共享\r\n    </div>\r\n    <md-divider ng-if=\"vm.items.length\"></md-divider>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'create\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.create($event)\"\r\n         ng-keydown=\"vm.onKeydown($event, \'create\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple\r\n         ng-if=\"!vm.items.length\">\r\n        <md-icon>create_new_folder</md-icon>\r\n        新建文件夹\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'create\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.createFile($event)\"\r\n         ng-keydown=\"vm.onKeydown($event, \'create\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple\r\n         ng-if=\"!vm.items.length\">\r\n        <md-icon>description</md-icon>\r\n        新建文件\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'upload\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.upload()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'upload\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple\r\n         ng-if=\"!vm.items.length\">\r\n        <md-icon>cloud_upload</md-icon>\r\n        上传文件\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'attr\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.attr()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'attr\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple>\r\n        <md-icon>featured_play_list</md-icon>\r\n        属性\r\n    </div>\r\n</div>");
$templateCache.put("src/js/file/templates/file-right-click-tree.html","<div class=\"fb-right-click\" role=\"listbox\" ng-if=\"vm.clickItem\">\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'open\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.open()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'open\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple>\r\n        <md-icon>drafts</md-icon>\r\n        打开\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'delete\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.delete($event)\"\r\n         ng-keydown=\"vm.onKeydown($event, \'delete\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple>\r\n        <md-icon>delete</md-icon>\r\n        删除\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'rename\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.rename()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'rename\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple>\r\n        <md-icon>border_color</md-icon>\r\n        重命名\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'cut\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.cut()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'cut\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple>\r\n        <md-icon>content_cut</md-icon>\r\n        剪切\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'copy\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.copy()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'copy\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple>\r\n        <md-icon>add_to_photos</md-icon>\r\n        复制\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'paste\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.paste()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'paste\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple\r\n         ng-if=\"vm.copyItems\">\r\n        <md-icon>layers</md-icon>\r\n        粘贴\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'compress\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.compress()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'compress\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple>\r\n        <md-icon>archive</md-icon>\r\n        压缩\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'hide\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.hide()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'hide\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple>\r\n        <md-icon>flip_to_back</md-icon>\r\n        隐藏文件夹\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'share\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.share()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'share\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple>\r\n        <md-icon>share</md-icon>\r\n        共享\r\n    </div>\r\n    <md-divider ng-if=\"vm.items.length\"></md-divider>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'create\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.create($event)\"\r\n         ng-keydown=\"vm.onKeydown($event, \'create\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple>\r\n        <md-icon>create_new_folder</md-icon>\r\n        新建文件夹\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'upload\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.upload()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'upload\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple>\r\n        <md-icon>cloud_upload</md-icon>\r\n        上传文件\r\n    </div>\r\n    <div class=\"menu-item\"\r\n         ng-class=\"{selected : \'attr\' == vm.selectItem}\"\r\n         tabindex=\"-1\"\r\n         role=\"option\"\r\n         ng-click=\"vm.attr()\"\r\n         ng-keydown=\"vm.onKeydown($event, \'attr\')\"\r\n         layout=\"row\" layout-align=\"start center\"\r\n         md-ink-ripple>\r\n        <md-icon>featured_play_list</md-icon>\r\n        属性\r\n    </div>\r\n</div>");
$templateCache.put("src/js/file/templates/file-tree.html","{{item.model.pathSuffix}}");
$templateCache.put("src/js/main/templates/main-sidenav.html","<fb-tree ng-model=\"vm.initNodes\" fb-load=\"vm.loadNode\" fb-select-node=\"vm.selectNode\"\r\n         fb-path-nodes=\"vm.pathNodes\" fb-filter=\"vm.treeNodeFilter\" fb-path-name=\"vm.pathName\"\r\n         fb-item-icon=\"\'folder\'\"\r\n         fb-right-click=\"vm.rightClickTree\"\r\n         fb-update=\"vm.updateTree\"\r\n         fb-tree-item-template-url=\"\'src/js/file/templates/file-tree.html\'\">\r\n</fb-tree>");
$templateCache.put("src/js/main/templates/main-topbar.html","<md-toolbar flex>\r\n    <div class=\"md-toolbar-tools\" layout=\"row\">\r\n        <div layout=\"row\" layout-align=\"start center\" flex=\"none\" class=\"nav-logo\">\r\n            <a ui-sref=\"main\"><img src=\"images/logo.png\" height=\"48\"></a>\r\n        </div>\r\n        <md-button class=\"md-icon-button\" ng-click=\"vm.toggleSidenav(\'left\')\" hide-gt-sm aria-label=\"Toggle Menu\">\r\n            <md-tooltip>{{\'change_sidenav\' | translate}}</md-tooltip>\r\n            <md-icon>menu</md-icon>\r\n        </md-button>\r\n        <span flex></span>\r\n\r\n        <md-switch class=\"md-primary\" ng-model=\"vm.resizeable\" aria-label=\"List Resizeable\">\r\n            <md-tooltip>{{\'list_resizeable\' | translate}}</md-tooltip>\r\n        </md-switch>\r\n\r\n        <md-switch class=\"md-primary\" ng-model=\"vm.isTrueData\" aria-label=\"NOT DEBUG\" ng-change=\"vm.changeDataType()\">\r\n            <md-tooltip>{{\'not_debug_mode\' | translate}}</md-tooltip>\r\n        </md-switch>\r\n\r\n        <md-button class=\"md-icon-button\" ng-click=\"vm.setViewType(\'list\')\" aria-label=\"List\" ng-if=\"vm.viewType == \'grid\'\">\r\n            <md-tooltip>{{\'list_view\' | translate}}</md-tooltip>\r\n            <md-icon>view_list</md-icon>\r\n        </md-button>\r\n        <md-button class=\"md-icon-button\" ng-click=\"vm.setViewType(\'grid\')\" aria-label=\"Grid\" ng-if=\"vm.viewType == \'list\'\">\r\n            <md-tooltip>{{\'grid_view\' | translate}}</md-tooltip>\r\n            <md-icon>apps</md-icon>\r\n        </md-button>\r\n\r\n        <md-menu md-position-mode=\"target-right target\" >\r\n            <md-button class=\"md-icon-button\" ng-click=\"$mdOpenMenu($event)\" aria-label=\"Change Language\">\r\n                <md-tooltip>{{\'change_language\' | translate}}</md-tooltip>\r\n                <md-icon>language</md-icon>\r\n            </md-button>\r\n            <md-menu-content width=\"4\" >\r\n                <md-menu-item>\r\n                    <md-button ng-click=\"vm.changeLanguage(\'zh_cn\')\">\r\n                            切换为中文\r\n                    </md-button>\r\n                </md-menu-item>\r\n                <md-menu-item>\r\n                    <md-button ng-click=\"vm.changeLanguage(\'en\')\">\r\n                            Change To English\r\n                    </md-button>\r\n                </md-menu-item>\r\n            </md-menu-content>\r\n        </md-menu>\r\n    </div>\r\n</md-toolbar>");
$templateCache.put("src/js/main/templates/main.html","<div layout=\"column\" flex class=\"overflow-auto fb-main\" ng-controller=\"MainController as vm\">\r\n    <div layout=\"row\" flex=\"none\" class=\"top-bar\" ng-include=\"\'src/js/main/templates/main-topbar.html\'\" md-whiteframe=\"4\" layout-align=\"center stretch\"></div>\r\n    <div layout=\"row\" flex style=\"position: relative;\">\r\n        <md-sidenav ng-include=\"\'src/js/main/templates/main-sidenav.html\'\" layout=\"column\" class=\"md-sidenav-left md-whiteframe-4dp\" md-component-id=\"left\" md-is-locked-open=\"$mdMedia(\'gt-sm\')\"></md-sidenav>\r\n        <md-content layout=\"column\" id=\"content\" flex>\r\n            <fb-list ng-model=\"vm.initNodes\" fb-click=\"vm.execNode\" fb-select-node=\"vm.selectNode\" fb-path-nodes=\"vm.pathNodes\" fb-select-nodes=\"vm.selectNodes\" fb-view=\"vm.viewType\"\r\n                     fb-path-name=\"vm.pathName\" fb-item-icon=\"vm.getItemIcon\" fb-sort-compare=\"vm.sortCompare\" fb-search-node-filter=\"vm.searchNodeFilter\" fb-node-config=\"vm.nodeConfig\"\r\n                     fb-list-item-grid-template-url=\"\'src/js/file/templates/file-list-grid.html\'\"\r\n                     fb-right-click=\"vm.rightClickList\"\r\n                     fb-resizeable=\"vm.resizeable\">\r\n            </fb-list>\r\n        </md-content>\r\n        <md-sidenav ng-include=\"\'src/js/file/templates/file-list-right.html\'\" layout=\"column\" class=\"md-sidenav-right md-whiteframe-4dp\" ng-class=\"{\'md-sidenav-expend\':vm.selectNodes[0].xAttrEdit}\" md-component-id=\"right\" md-disable-backdrop></md-sidenav>\r\n    </div>\r\n</div>");}]);