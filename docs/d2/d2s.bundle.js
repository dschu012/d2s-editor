var d2s =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/binary/bitreader.ts":
/*!*********************************!*\
  !*** ./src/binary/bitreader.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.BitReader = void 0;
var BitReader = /** @class */ (function () {
    function BitReader(arrBuffer) {
        var _this = this;
        this.littleEndian = true;
        this.offset = 0;
        var typedArray = new Uint8Array(arrBuffer);
        this.bits = new Uint8Array(typedArray.length * 8);
        typedArray.reduce(function (acc, c) {
            var b = c
                .toString(2)
                .padStart(8, "0")
                .split("")
                .reverse()
                .map(function (e) { return parseInt(e, 2); });
            b.forEach(function (bit) { return (_this.bits[acc++] = bit); });
            return acc;
        }, 0);
    }
    BitReader.prototype.ReadBit = function () {
        return this.bits[this.offset++];
    };
    BitReader.prototype.ReadBitArray = function (count) {
        var bits = new Uint8Array(count);
        for (var i = 0; i < count; i++) {
            bits[i] = this.bits[this.offset++];
        }
        return bits;
    };
    BitReader.prototype.ReadBits = function (bytes, count) {
        var byteIndex = 0;
        var bitIndex = 0;
        for (var i = 0; i < count; i++) {
            if (this.bits[this.offset + i]) {
                bytes[byteIndex] |= (1 << bitIndex) & 0xff;
            }
            bitIndex++;
            if (bitIndex == 8) {
                byteIndex++;
                bitIndex = 0;
            }
        }
        this.offset += count;
        return bytes;
    };
    BitReader.prototype.ReadBytes = function (bytes) {
        return this.ReadBits(new Uint8Array(bytes), bytes * 8);
    };
    BitReader.prototype.ReadArray = function (bytes) {
        return this.ReadBytes(bytes);
    };
    BitReader.prototype.ReadByte = function (bits) {
        if (bits === void 0) { bits = 8; }
        var dataview = new DataView(this.ReadBits(new Uint8Array(1), bits).buffer);
        return dataview.getUint8(0);
    };
    BitReader.prototype.ReadUInt8 = function (bits) {
        if (bits === void 0) { bits = 8; }
        return this.ReadByte(bits);
    };
    BitReader.prototype.ReadUInt16 = function (bits) {
        if (bits === void 0) { bits = 8 * 2; }
        var dataview = new DataView(this.ReadBits(new Uint8Array(2), bits).buffer);
        return dataview.getUint16(0, this.littleEndian);
    };
    BitReader.prototype.ReadUInt32 = function (bits) {
        if (bits === void 0) { bits = 8 * 4; }
        var dataview = new DataView(this.ReadBits(new Uint8Array(4), bits).buffer);
        return dataview.getUint32(0, this.littleEndian);
    };
    BitReader.prototype.ReadString = function (bytes) {
        var buffer = this.ReadBytes(bytes).buffer;
        return new TextDecoder().decode(buffer);
    };
    BitReader.prototype.ReadNullTerminatedString = function () {
        var start = this.offset;
        while (this.ReadByte()) { }
        var end = this.offset - 8;
        var buffer = this.SeekBit(start).ReadBytes((end - start) / 8);
        this.SeekBit(end + 8);
        return new TextDecoder().decode(buffer);
    };
    BitReader.prototype.SkipBits = function (number) {
        this.offset += number;
        return this;
    };
    BitReader.prototype.SkipBytes = function (number) {
        return this.SkipBits(number * 8);
    };
    BitReader.prototype.SeekBit = function (offset) {
        this.offset = offset;
        return this;
    };
    BitReader.prototype.SeekByte = function (offset) {
        return this.SeekBit(offset * 8);
    };
    BitReader.prototype.Align = function () {
        this.offset = (this.offset + 7) & ~7;
        return this;
    };
    return BitReader;
}());
exports.BitReader = BitReader;


/***/ }),

/***/ "./src/binary/bitwriter.ts":
/*!*********************************!*\
  !*** ./src/binary/bitwriter.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.BitWriter = void 0;
var BitWriter = /** @class */ (function () {
    function BitWriter(capacity) {
        if (capacity === void 0) { capacity = 8192; }
        this.littleEndian = true;
        this.offset = 0;
        this.length = 0;
        this.bits = new Uint8Array(capacity);
    }
    BitWriter.prototype.WriteBit = function (value) {
        if (this.offset >= this.bits.length) {
            var resized = new Uint8Array(this.bits.length + 8192);
            resized.set(this.bits, 0);
            this.bits = resized;
        }
        this.bits[this.offset++] = value;
        if (this.offset > this.length)
            this.length++;
        return this;
    };
    BitWriter.prototype.WriteBits = function (bits, numberOfBits) {
        for (var i = 0; i < numberOfBits; i++) {
            this.WriteBit(bits[i]);
        }
        return this;
    };
    BitWriter.prototype.WriteBytes = function (bytes, numberOfBits) {
        if (numberOfBits === void 0) { numberOfBits = bytes.length * 8; }
        var toWrite = new Uint8Array(numberOfBits);
        bytes.reduce(function (acc, c) {
            var b = c
                .toString(2)
                .padStart(8, "0")
                .split("")
                .reverse()
                .map(function (e) { return parseInt(e, 2); });
            b.forEach(function (bit) { return (toWrite[acc++] = bit); });
            return acc;
        }, 0);
        return this.WriteBits(toWrite, numberOfBits);
    };
    BitWriter.prototype.WriteArray = function (bytes, numberOfBits) {
        if (numberOfBits === void 0) { numberOfBits = bytes.length * 8; }
        return this.WriteBytes(bytes, numberOfBits);
    };
    BitWriter.prototype.WriteByte = function (value, numberOfBits) {
        if (numberOfBits === void 0) { numberOfBits = 8; }
        var buffer = new Uint8Array(1);
        new DataView(buffer.buffer).setUint8(0, value);
        return this.WriteBytes(buffer, numberOfBits);
    };
    BitWriter.prototype.WriteUInt8 = function (value, numberOfBits) {
        if (numberOfBits === void 0) { numberOfBits = 8; }
        return this.WriteByte(value, numberOfBits);
    };
    BitWriter.prototype.WriteUInt16 = function (value, numberOfBits) {
        if (numberOfBits === void 0) { numberOfBits = 8 * 2; }
        var buffer = new Uint8Array(2);
        new DataView(buffer.buffer).setUint16(0, value, this.littleEndian);
        return this.WriteBytes(buffer, numberOfBits);
    };
    BitWriter.prototype.WriteUInt32 = function (value, numberOfBits) {
        if (numberOfBits === void 0) { numberOfBits = 8 * 4; }
        var buffer = new Uint8Array(4);
        new DataView(buffer.buffer).setUint32(0, value, this.littleEndian);
        return this.WriteBytes(buffer, numberOfBits);
    };
    BitWriter.prototype.WriteString = function (value, numberOfBytes) {
        var buffer = new TextEncoder().encode(value);
        return this.WriteBytes(buffer, numberOfBytes * 8);
    };
    BitWriter.prototype.SeekBit = function (offset) {
        this.offset = offset;
        if (this.offset > this.length) {
            this.length = this.offset;
        }
        return this;
    };
    BitWriter.prototype.SeekByte = function (offset) {
        return this.SeekBit(offset * 8);
    };
    BitWriter.prototype.PeekBytes = function (count) {
        var buffer = new Uint8Array(count);
        var byteIndex = 0;
        var bitIndex = 0;
        for (var i = 0; i < count * 8; ++i) {
            if (this.bits[this.offset + i]) {
                buffer[byteIndex] |= (1 << bitIndex) & 0xff;
            }
            ++bitIndex;
            if (bitIndex >= 8) {
                ++byteIndex;
                bitIndex = 0;
            }
        }
        return buffer;
    };
    BitWriter.prototype.Align = function () {
        this.offset = (this.offset + 7) & ~7;
        if (this.offset > this.length) {
            this.length = this.offset;
        }
        return this;
    };
    BitWriter.prototype.ToArray = function () {
        var buffer = new Uint8Array((this.length - 1) / 8 + 1);
        var byteIndex = 0;
        var bitIndex = 0;
        for (var i = 0; i < this.length; ++i) {
            if (this.bits[i]) {
                buffer[byteIndex] |= (1 << bitIndex) & 0xff;
            }
            ++bitIndex;
            if (bitIndex >= 8) {
                ++byteIndex;
                bitIndex = 0;
            }
        }
        return buffer;
    };
    return BitWriter;
}());
exports.BitWriter = BitWriter;


/***/ }),

/***/ "./src/d2/attribute_enhancer.ts":
/*!**************************************!*\
  !*** ./src/d2/attribute_enhancer.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFixedMods = exports.enhanceItems = exports.enhancePlayerAttributes = exports.enhanceAttributes = void 0;
var types = __importStar(__webpack_require__(/*! ./types */ "./src/d2/types.ts"));
var ItemStatGroups_json_1 = __importDefault(__webpack_require__(/*! ../data/ItemStatGroups.json */ "./src/data/ItemStatGroups.json"));
var SkillTabs_json_1 = __importDefault(__webpack_require__(/*! ../data/SkillTabs.json */ "./src/data/SkillTabs.json"));
//do nice stuff
//combine group properties (all resists/all stats) and build friendly strings for a ui
//enhanced def/durability/weapon damage.
//lookup socketed compact items (runes/gems) properties for the slot they are in
//compute attributes like str/resists/etc..
function enhanceAttributes(char, constants) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            enhanceItems(char.items, constants);
            enhanceItems([char.golem_item], constants);
            enhanceItems(char.merc_items, constants);
            enhanceItems(char.corpse_items, constants);
            enhancePlayerAttributes(char, constants);
            return [2 /*return*/];
        });
    });
}
exports.enhanceAttributes = enhanceAttributes;
function enhancePlayerAttributes(char, constants) {
    return __awaiter(this, void 0, void 0, function () {
        var items;
        return __generator(this, function (_a) {
            items = char.items.filter(function (item) {
                return item.location_id === 1 && item.equipped_id !== 13 && item.equipped_id !== 14;
            });
            char.item_bonuses = [].concat
                .apply([], items.map(function (item) { return allAttributes(item, constants); }))
                .filter(function (attribute) { return attribute != null; });
            //char.item_bonuses = _groupAttributes(char.item_bonuses, constants);
            describeMods(char.item_bonuses, constants);
            return [2 /*return*/];
        });
    });
}
exports.enhancePlayerAttributes = enhancePlayerAttributes;
function enhanceItems(items, constants) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, items_1, item;
        return __generator(this, function (_a) {
            if (!items) {
                return [2 /*return*/];
            }
            for (_i = 0, items_1 = items; _i < items_1.length; _i++) {
                item = items_1[_i];
                if (!item) {
                    continue;
                }
                postProcessItem(item, constants);
            }
            return [2 /*return*/];
        });
    });
}
exports.enhanceItems = enhanceItems;
function postProcessItem(item, constants) {
    if (item.socketed_items && item.socketed_items.length) {
        for (var _i = 0, _a = item.socketed_items; _i < _a.length; _i++) {
            var socketed = _a[_i];
            var pt = constants.armor_items[item.type] || constants.weapon_items[item.type] || constants.other_items[socketed.type];
            var gem = constants.other_items[socketed.type];
            if (gem.m) {
                socketed.magic_attributes = generateFixedMods(gem.m[pt.gt], constants);
            }
            enhanceItem(socketed, constants);
        }
    }
    enhanceItem(item, constants);
    if (item.magic_attributes || item.runeword_attributes || item.socketed_items) {
        item.displayed_magic_attributes = describeMods(item.magic_attributes, constants);
        item.displayed_runeword_attributes = describeMods(item.runeword_attributes, constants);
        item.combined_magic_attributes = allAttributes(item, constants);
        item.displayed_combined_magic_attributes = describeMods(item.combined_magic_attributes, constants);
    }
}
function enhanceItem(item, constants) {
    var _a, _b, _c, _d;
    item.level = boundValue(item.level, 1, 99);
    // Ensure coherence of other attributes with quality
    if (item.given_runeword) {
        item.runeword_name = constants.runewords[item.runeword_id] ? constants.runewords[item.runeword_id].n : "";
        if (item.quality > types.Quality.Superior) {
            // Cannot be a runeword
            item.given_runeword = 0;
            item.runeword_id = 0;
            item.runeword_name = "";
            item.runeword_attributes = [];
        }
    }
    if (item.quality !== types.Quality.Magic) {
        item.magic_prefix = 0;
        item.magic_suffix = 0;
    }
    if (item.quality === types.Quality.Rare || item.quality === types.Quality.Crafted) {
        item.rare_name = constants.rare_names[item.rare_name_id] ? constants.rare_names[item.rare_name_id].n : "";
        item.rare_name2 = constants.rare_names[item.rare_name_id2] ? constants.rare_names[item.rare_name_id2].n : "";
    }
    else {
        item.rare_name_id = 0;
        item.rare_name = "";
        item.rare_name_id2 = 0;
        item.rare_name2 = "";
        item.magical_name_ids = [0, 0, 0, 0, 0, 0];
    }
    if (item.quality === types.Quality.Set) {
        item.set_name = constants.set_items[item.set_id] ? constants.set_items[item.set_id].n : "";
    }
    else {
        item.set_id = 0;
        item.set_name = "";
        item.set_attributes = [];
    }
    if (item.quality === types.Quality.Unique) {
        item.unique_name = constants.unq_items[item.unique_id] ? constants.unq_items[item.unique_id].n : "";
    }
    else {
        item.unique_id = 0;
        item.unique_name = "";
    }
    if (item.quality !== types.Quality.Magic && item.quality !== types.Quality.Unique) {
        item.personalized = 0;
        item.personalized_name = "";
    }
    var details = null;
    if (constants.armor_items[item.type]) {
        details = constants.armor_items[item.type];
        item.type_id = types.ItemType.Armor;
        if (details.maxac) {
            if (item.ethereal == 0) {
                item.defense_rating = details.maxac;
            }
            else if (item.ethereal == 1) {
                item.defense_rating = Math.floor(details.maxac * 1.5);
            }
        }
    }
    else if (constants.weapon_items[item.type]) {
        details = constants.weapon_items[item.type];
        item.type_id = types.ItemType.Weapon;
        var base_damage = {};
        if (item.ethereal == 0) {
            if (details.mind)
                base_damage.mindam = details.mind;
            if (details.maxd)
                base_damage.maxdam = details.maxd;
            if (details.min2d)
                base_damage.twohandmindam = details.min2d;
            if (details.max2d)
                base_damage.twohandmaxdam = details.max2d;
        }
        else if (item.ethereal == 1) {
            if (details.mind)
                base_damage.mindam = Math.floor(details.mind * 1.5);
            if (details.maxd)
                base_damage.maxdam = Math.floor(details.maxd * 1.5);
            if (details.min2d)
                base_damage.twohandmindam = Math.floor(details.min2d * 1.5);
            if (details.max2d)
                base_damage.twohandmaxdam = Math.floor(details.max2d * 1.5);
        }
        item.base_damage = base_damage;
    }
    else if (constants.other_items[item.type]) {
        item.type_id = types.ItemType.Other;
        details = constants.other_items[item.type];
    }
    if (details) {
        if (details.n)
            item.type_name = details.n;
        if (details.rs)
            item.reqstr = details.rs;
        if (details.rd)
            item.reqdex = details.rd;
        if (details.i)
            item.inv_file = details.i;
        if (details.ih)
            item.inv_height = details.ih;
        if (details.iw)
            item.inv_width = details.iw;
        if (details.it)
            item.inv_transform = details.it;
        if (details.iq)
            item.item_quality = details.iq;
        if (details.c)
            item.categories = details.c;
        if (details.durability) {
            if (item.ethereal == 0) {
                item.current_durability = details.durability;
                item.max_durability = details.durability;
            }
            else if (item.ethereal == 1) {
                item.current_durability = details.durability - Math.ceil(details.durability / 2) + 1;
                item.max_durability = details.durability - Math.ceil(details.durability / 2) + 1;
            }
        }
        // Enforce coherence between total_nr_of_sockets & socketed
        if (item.total_nr_of_sockets > 0) {
            item.socketed = 1;
        }
        else {
            item.socketed = 0;
        }
        if (item.multiple_pictures) {
            item.inv_file = details.ig[item.picture_id];
        }
        if (item.magic_prefix || item.magic_suffix) {
            if (item.magic_prefix && ((_a = constants.magic_prefixes[item.magic_prefix]) === null || _a === void 0 ? void 0 : _a.tc)) {
                item.transform_color = constants.magic_prefixes[item.magic_prefix].tc;
            }
            if (item.magic_suffix && ((_b = constants.magic_suffixes[item.magic_suffix]) === null || _b === void 0 ? void 0 : _b.tc)) {
                item.transform_color = constants.magic_suffixes[item.magic_suffix].tc;
            }
        }
        else if (item.magical_name_ids && item.magical_name_ids.length === 6) {
            for (var i = 0; i < 6; i++) {
                var id = item.magical_name_ids[i];
                if (id) {
                    if (i % 2 == 0 && constants.magic_prefixes[id] && ((_c = constants.magic_prefixes[id]) === null || _c === void 0 ? void 0 : _c.tc)) {
                        // even is prefixes
                        item.transform_color = constants.magic_prefixes[id].tc;
                    }
                    else if (constants.magic_suffixes[id] && ((_d = constants.magic_suffixes[id]) === null || _d === void 0 ? void 0 : _d.tc)) {
                        // odd is suffixes
                        item.transform_color = constants.magic_suffixes[id].tc;
                    }
                }
            }
        }
        else if (item.unique_id) {
            var unq = constants.unq_items[item.unique_id];
            if (details.ui)
                item.inv_file = details.ui;
            if (unq && unq.i)
                item.inv_file = unq.i;
            if (unq && unq.tc)
                item.transform_color = unq.tc;
        }
        else if (item.set_id) {
            var set = constants.set_items[item.set_id];
            if (details.ui)
                item.inv_file = details.ui;
            if (set && set.i)
                item.inv_file = set.i;
            if (set && set.tc)
                item.transform_color = set.tc;
        }
    }
}
function generateFixedMods(mods, constants) {
    var _a;
    var modifiers = [];
    for (var _i = 0, mods_1 = mods; _i < mods_1.length; _i++) {
        var mod = mods_1[_i];
        var _loop_1 = function (stat) {
            var statId = constants.magical_properties.findIndex(function (e) { return e.s === stat.s; });
            var prop = constants.magical_properties[statId];
            if (prop) {
                var values = [];
                var v = void 0;
                var param = void 0;
                switch (stat.type) {
                    case "proc":
                        values = [mod.max, mod.p, mod.min];
                        v = mod.max;
                        break;
                    case "charges":
                        values = [mod.max, mod.p, mod.min, mod.min];
                        v = mod.max;
                        break;
                    case "all":
                        values = [mod.min, mod.max];
                        v = mod.max;
                        param = mod.p;
                        break;
                    case "min":
                        values = [mod.min];
                        v = mod.min;
                        break;
                    case "max":
                        values = [mod.max];
                        v = mod.max;
                    case "param":
                        values = mod.p ? [mod.p, mod.max] : [mod.max];
                        v = Number(mod.p);
                        if (prop.s == "poisonlength") {
                            values = [mod.min, mod.max, mod.p];
                        }
                        break;
                    case "other":
                        param = mod.p ? (prop.s == "item_addskill_tab" ? SkillTabs_json_1.default[Number(mod.p)].id : mod.p) : stat.val;
                        if (param && prop.s == "item_addskill_tab") {
                            values = [param & 0x7, (param >> 3) & 0x1fff, mod.max];
                        }
                        else if (param) {
                            values = [param, mod.max];
                        }
                        else {
                            values = [mod.max];
                        }
                        v = mod.max;
                        if (mod.prop == "skill-rand") {
                            var rnd = Math.floor(Math.random() * (mod.max - mod.min) + mod.min);
                            values = [(_a = constants.skills[rnd]) === null || _a === void 0 ? void 0 : _a.id, mod.p];
                        }
                        break;
                }
                modifiers.push({
                    id: statId,
                    name: prop.s,
                    values: values,
                    value: v,
                    param: param,
                    type: stat.type,
                });
            }
        };
        for (var _b = 0, _c = constants.properties[mod.prop] || []; _b < _c.length; _b++) {
            var stat = _c[_b];
            _loop_1(stat);
        }
    }
    return modifiers;
}
exports.generateFixedMods = generateFixedMods;
function describeMods(magic_attributes, constants) {
    var _a;
    if (!magic_attributes)
        return [];
    var mods = __spreadArrays(magic_attributes.map(function (attr) { return (__assign({}, attr)); }));
    for (var _i = 0, mods_2 = mods; _i < mods_2.length; _i++) {
        var mod = mods_2[_i];
        var prop = constants.magical_properties[mod.id];
        mod.value = mod.values[((_a = mod.values) === null || _a === void 0 ? void 0 : _a.length) - 1];
        mod.param = prop.dF !== 19 ? mod.values[0] : undefined;
        //mod.df =  prop.dF;
        //mod.so = prop.so;
    }
    consolidateMods(mods);
    for (var _b = 0, mods_3 = mods; _b < mods_3.length; _b++) {
        var mod = mods_3[_b];
        var prop = constants.magical_properties[mod.id];
        mod.description = describeSingleMod(mod, prop, constants);
    }
    addModGroups(mods, constants);
    mods.sort(function (a, b) { var _a, _b; return ((_a = constants.magical_properties[b.id]) === null || _a === void 0 ? void 0 : _a.so) - ((_b = constants.magical_properties[a.id]) === null || _b === void 0 ? void 0 : _b.so); });
    return mods;
}
function describeSingleMod(mod, prop, constants) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    if (!prop)
        return;
    var val = mod.value;
    if (prop.s.endsWith("perlevel")) {
        // Per-level mod, we show it for character level 99 for the flair
        if (prop.s.includes("tohit")) {
            val = val / 2;
        }
        else {
            val = val / 8;
        }
        val = Math.floor(99 * val);
    }
    var modDesc = (val !== null && val !== void 0 ? val : 0) < 0 ? prop.dN : prop.dP;
    if (prop.id == 39 || prop.id == 41 || prop.id == 43 || prop.id == 45) {
        modDesc = prop.dP;
    }
    var valueDesc;
    switch (prop.dF) {
        case 1:
        case 6:
        case 12:
            valueDesc = (val !== null && val !== void 0 ? val : 0) < 0 ? "" + val : "+" + val;
            break;
        case 2:
        case 7:
            valueDesc = val + "%";
            break;
        case 3:
        case 9:
            valueDesc = "" + val;
            break;
        case 4:
        case 8:
            valueDesc = (val !== null && val !== void 0 ? val : 0) < 0 ? val + "%" : "+" + val + "%";
            break;
        case 5:
        case 10:
            valueDesc = Math.floor((val * 100) / 128) + "%";
            break;
        case 11:
            modDesc = modDesc.replace("%d", "" + 100 / val);
            break;
        case 13: // +[value] to [class] Skill Levels
            modDesc = formatStr(constants.classes[mod.values[0]].as, val);
            break;
        case 14: // +[value] to [skilltab] Skill Levels ([class] Only)
            var skillTab = (_a = constants.classes[mod.values[1]]) === null || _a === void 0 ? void 0 : _a.ts[mod.values[0]];
            if (skillTab) {
                modDesc = "+" + val + " to " + skillTab + " " + constants.classes[mod.values[1]].co;
                modDesc = formatStr(skillTab, val) + " " + constants.classes[mod.values[1]].co;
            }
            break;
        case 15: // [chance]% to cast [slvl] [skill] on [event]
            modDesc = modDesc
                // Extra % because the actual one is doubled to escape it
                .replace("%d%", "" + mod.values[2])
                .replace("%d", "" + mod.values[0])
                .replace("%s", "" + ((_b = constants.skills[mod.values[1]]) === null || _b === void 0 ? void 0 : _b.n));
            break;
        case 16: // Level [sLvl] [skill] Aura When Equipped
            modDesc = modDesc.replace("%d", "" + val).replace("%s", "" + ((_c = constants.skills[mod.values[0]]) === null || _c === void 0 ? void 0 : _c.n));
            break;
        case 19: //main
            modDesc = formatStr(modDesc, val);
            break;
        case 20:
            valueDesc = -val + "%";
            break;
        case 21:
            valueDesc = "" + -val;
            break;
        case 22: // [value]% / [montype]
            valueDesc = val + "%";
            break;
        case 23: // [value]% / [montype]
            valueDesc = val + "%";
            modDesc = formatStr(modDesc, val);
            break;
        case 24: // charges
            modDesc = formatStr(modDesc, mod.values[0], constants.skills[mod.values[1]].n, mod.values[2], mod.values[3]);
            break;
        case 27: // +[value] to [skill] ([class] Only)
            var skill_1 = constants.skills[mod.values[0]];
            modDesc = formatStr(modDesc, val, skill_1 === null || skill_1 === void 0 ? void 0 : skill_1.n, (_d = constants.classes.filter(function (e) { return (e === null || e === void 0 ? void 0 : e.c) === (skill_1 === null || skill_1 === void 0 ? void 0 : skill_1.c); })[0]) === null || _d === void 0 ? void 0 : _d.co);
            break;
        case 28: // +[value] to [skill]
            modDesc = formatStr(modDesc, val, (_e = constants.skills[mod.values[0]]) === null || _e === void 0 ? void 0 : _e.n);
            break;
        // Custom describe functions to handle groups
        case 100:
            // Non-poison elemental or magic damage.
            if (((_f = mod.values) === null || _f === void 0 ? void 0 : _f[0]) !== ((_g = mod.values) === null || _g === void 0 ? void 0 : _g[1])) {
                modDesc = prop.dN;
            }
            modDesc = modDesc.replace("%d", "" + ((_h = mod.values) === null || _h === void 0 ? void 0 : _h[0])).replace("%d", "" + ((_j = mod.values) === null || _j === void 0 ? void 0 : _j[1]));
            break;
        case 101: // Poison damage
            if (((_k = mod.values) === null || _k === void 0 ? void 0 : _k[0]) === ((_l = mod.values) === null || _l === void 0 ? void 0 : _l[1])) {
                modDesc = modDesc
                    .replace("%d", "" + Math.round((mod.values[0] * mod.values[2]) / 256))
                    .replace("%d", "" + Math.round(mod.values[2] / 25));
            }
            else {
                modDesc = prop.dN
                    .replace("%d", "" + Math.round((mod.values[0] * mod.values[2]) / 256))
                    .replace("%d", "" + Math.round((mod.values[1] * mod.values[2]) / 256))
                    .replace("%d", "" + Math.round(mod.values[2] / 25));
            }
            break;
    }
    if (modDesc) {
        var fullDesc = "";
        switch (prop.dV) {
            case 1:
                fullDesc = valueDesc + " " + modDesc;
                break;
            case 2:
                fullDesc = modDesc + " " + valueDesc;
                break;
            default:
                fullDesc = modDesc;
        }
        if (6 <= prop.dF && prop.dF <= 9) {
            fullDesc += " " + prop.d2;
        }
        return fullDesc;
    }
}
function addModGroups(modifiers, constants) {
    var _a, _b, _c;
    var _loop_2 = function (group) {
        var mods = (_a = modifiers === null || modifiers === void 0 ? void 0 : modifiers.filter(function (_a) {
            var id = _a.id;
            return group.statsInGroup.includes(id);
        })) !== null && _a !== void 0 ? _a : [];
        // We assume a mods have been merged so we cannot have duplicates
        if (mods.length !== group.statsInGroup.length) {
            return "continue";
        }
        if (group.allEqual && mods.some(function (_a) {
            var value = _a.value;
            return value !== mods[0].value;
        })) {
            return "continue";
        }
        // On some rare items we can get increase in min damage that's larger than the increase in max damage.
        // The game solves this by displaying them separately.
        if (group.isRange && ((_b = mods[0].value) !== null && _b !== void 0 ? _b : 0) > ((_c = mods[1].value) !== null && _c !== void 0 ? _c : 0)) {
            return "continue";
        }
        // Damage increase on non-weapons is awkward, it has all 4 mods that apply in the multiple groups.
        if (group.s === "group:secondary-dmg" || group.s === "group:min-dmg" || group.s === "group:max-dmg") {
            // We already described the range, ignore these "duplicate" groups
            if (modifiers === null || modifiers === void 0 ? void 0 : modifiers.find(function (mod) { return mod.name === "group:primary-dmg"; })) {
                // We still have to remember to delete the description from the mods,
                // primary-dmg only contains 2, not all 4.
                for (var _i = 0, mods_4 = mods; _i < mods_4.length; _i++) {
                    var mod = mods_4[_i];
                    delete mod.description;
                }
                return "continue";
            }
        }
        var extraMod = {
            id: -1,
            name: group.s,
            so: group.so,
            df: group.dF,
            value: mods[0].value,
            //value: group.allEqual ? mods[0].value : undefined,
            values: mods.map(function (_a) {
                var value = _a.value;
                return value !== null && value !== void 0 ? value : 0;
            }),
        };
        extraMod.description = describeSingleMod(extraMod, group, constants);
        modifiers === null || modifiers === void 0 ? void 0 : modifiers.push(extraMod);
        // Clear descriptions of items in group so they are not displayed
        for (var _a = 0, mods_5 = mods; _a < mods_5.length; _a++) {
            var mod = mods_5[_a];
            delete mod.description;
        }
    };
    for (var _i = 0, statGroups_1 = ItemStatGroups_json_1.default; _i < statGroups_1.length; _i++) {
        var group = statGroups_1[_i];
        _loop_2(group);
    }
}
function formatStr(str) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var i = 0;
    return str === null || str === void 0 ? void 0 : str.replace(/%(\+)?([ids%\d])/g, function (m, plus, chr) {
        if (chr === "%") {
            return chr;
        }
        else {
            var value = chr === "d" || chr === "s" || chr === "i" ? values[i++] : values[chr];
            if (plus && !isNaN(value) && parseInt(value) > 0)
                value = "+" + value;
            return value;
        }
    });
}
function consolidateMods(mods) {
    var _a, _b;
    var _loop_3 = function (mod) {
        var duplicateIndex = void 0;
        while ((duplicateIndex = mods.findIndex(function (other) { return mod !== other && mod.id === other.id && "value" in mod && mod.param === other.param; })) >= 0) {
            var duplicate = mods.splice(duplicateIndex, 1)[0];
            mod.value = ((_a = mod.value) !== null && _a !== void 0 ? _a : 0) + ((_b = duplicate.value) !== null && _b !== void 0 ? _b : 0);
        }
    };
    for (var _i = 0, mods_6 = mods; _i < mods_6.length; _i++) {
        var mod = mods_6[_i];
        _loop_3(mod);
    }
}
function boundValue(v, min, max) {
    return Math.min(max, Math.max(min, v));
}
function _itemStatCostFromStat(stat, constants) {
    return constants.magical_properties.findIndex(function (e) { return e.s === stat; });
}
function _classFromCode(code, constants) {
    return constants.classes.filter(function (e) { return e.c === code; })[0];
}
function allAttributes(item, constants) {
    var socketed_attributes = [];
    if (item.socketed_items) {
        for (var _i = 0, _a = item.socketed_items; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.magic_attributes) {
                socketed_attributes = socketed_attributes.concat.apply(socketed_attributes, JSON.parse(JSON.stringify(i.magic_attributes)));
            }
        }
    }
    var magic_attributes = item.magic_attributes || [];
    var runeword_attributes = item.runeword_attributes || [];
    //const set_attributes = item.set_attributes || [];
    return __spreadArrays([], JSON.parse(JSON.stringify(magic_attributes)), JSON.parse(JSON.stringify(runeword_attributes)), JSON.parse(JSON.stringify(socketed_attributes))).filter(function (attribute) { return attribute != null; });
}


/***/ }),

/***/ "./src/d2/attributes.ts":
/*!******************************!*\
  !*** ./src/d2/attributes.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeAttributes = exports.readAttributes = void 0;
var bitwriter_1 = __webpack_require__(/*! ../binary/bitwriter */ "./src/binary/bitwriter.ts");
//todo use constants.magical_properties and csvBits
function readAttributes(char, reader, constants) {
    return __awaiter(this, void 0, void 0, function () {
        var header, classData, bitoffset, id, field, size;
        return __generator(this, function (_a) {
            char.attributes = {};
            header = reader.ReadString(2);
            if (header != "gf") {
                // header is not present in first save after char is created
                if (char.header.level === 1) {
                    classData = constants.classes.find(function (c) { return c.n === char.header.class; }).a;
                    char.attributes = {
                        strength: +classData.str,
                        energy: +classData.int,
                        dexterity: +classData.dex,
                        vitality: +classData.vit,
                        unused_stats: 0,
                        unused_skill_points: 0,
                        current_hp: +classData.vit + +classData.hpadd,
                        max_hp: +classData.vit + +classData.hpadd,
                        current_mana: +classData.int,
                        max_mana: +classData.int,
                        current_stamina: +classData.stam,
                        max_stamina: +classData.stam,
                        level: 1,
                        experience: 0,
                        gold: 0,
                        stashed_gold: 0,
                    };
                    return [2 /*return*/];
                }
                throw new Error("Attribute header 'gf' not found at position " + (reader.offset - 2 * 8));
            }
            bitoffset = 0;
            id = reader.ReadUInt16(9);
            //read till 0x1ff end of attributes is found
            while (id != 0x1ff) {
                bitoffset += 9;
                field = constants.magical_properties[id];
                if (field === undefined) {
                    throw new Error("Invalid attribute id: " + id);
                }
                size = field.cB;
                char.attributes[Attributes[field.s]] = reader.ReadUInt32(size);
                //current_hp - max_stamina need to be bit shifted
                if (id >= 6 && id <= 11) {
                    char.attributes[Attributes[field.s]] >>>= 8;
                }
                bitoffset += size;
                id = reader.ReadUInt16(9);
            }
            reader.Align();
            return [2 /*return*/];
        });
    });
}
exports.readAttributes = readAttributes;
function writeAttributes(char, constants) {
    return __awaiter(this, void 0, void 0, function () {
        var writer, i, property, value, size;
        return __generator(this, function (_a) {
            writer = new bitwriter_1.BitWriter();
            writer.WriteString("gf", 2); //0x0000 [attributes header = 0x67, 0x66 "gf"]
            for (i = 0; i < 16; i++) {
                property = constants.magical_properties[i];
                if (property === undefined) {
                    throw new Error("Invalid attribute: " + property);
                }
                value = char.attributes[Attributes[property.s]];
                if (!value) {
                    continue;
                }
                size = property.cB;
                if (i >= 6 && i <= 11) {
                    value <<= 8;
                }
                writer.WriteUInt16(i, 9);
                writer.WriteUInt32(value, size);
            }
            writer.WriteUInt16(0x1ff, 9);
            writer.Align();
            return [2 /*return*/, writer.ToArray()];
        });
    });
}
exports.writeAttributes = writeAttributes;
//nokkas names
var Attributes = {
    strength: "strength",
    energy: "energy",
    dexterity: "dexterity",
    vitality: "vitality",
    statpts: "unused_stats",
    newskills: "unused_skill_points",
    hitpoints: "current_hp",
    maxhp: "max_hp",
    mana: "current_mana",
    maxmana: "max_mana",
    stamina: "current_stamina",
    maxstamina: "max_stamina",
    level: "level",
    experience: "experience",
    gold: "gold",
    goldbank: "stashed_gold",
};


/***/ }),

/***/ "./src/d2/constants.ts":
/*!*****************************!*\
  !*** ./src/d2/constants.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.setConstantData = exports.getConstantData = void 0;
var versionedConstants = new Map();
function getConstantData(version) {
    if (!(version in versionedConstants)) {
        throw new Error("No constant data found for this version " + version);
    }
    return versionedConstants[version];
}
exports.getConstantData = getConstantData;
function setConstantData(version, data) {
    versionedConstants[version] = data;
}
exports.setConstantData = setConstantData;


/***/ }),

/***/ "./src/d2/d2s.ts":
/*!***********************!*\
  !*** ./src/d2/d2s.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeItem = exports.readItem = exports.write = exports.read = exports.writer = exports.reader = void 0;
var header_1 = __webpack_require__(/*! ./header */ "./src/d2/header.ts");
var attributes_1 = __webpack_require__(/*! ./attributes */ "./src/d2/attributes.ts");
var bitreader_1 = __webpack_require__(/*! ../binary/bitreader */ "./src/binary/bitreader.ts");
var bitwriter_1 = __webpack_require__(/*! ../binary/bitwriter */ "./src/binary/bitwriter.ts");
var skills_1 = __webpack_require__(/*! ./skills */ "./src/d2/skills.ts");
var items = __importStar(__webpack_require__(/*! ./items */ "./src/d2/items.ts"));
var constants_1 = __webpack_require__(/*! ./constants */ "./src/d2/constants.ts");
var attribute_enhancer_1 = __webpack_require__(/*! ./attribute_enhancer */ "./src/d2/attribute_enhancer.ts");
var defaultConfig = {
    extendedStash: false,
    sortProperties: true,
};
function reader(buffer) {
    return new bitreader_1.BitReader(buffer);
}
exports.reader = reader;
function read(buffer, constants, userConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var char, reader, config;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    char = {};
                    reader = new bitreader_1.BitReader(buffer);
                    config = Object.assign(defaultConfig, userConfig);
                    return [4 /*yield*/, header_1.readHeader(char, reader)];
                case 1:
                    _a.sent();
                    //could load constants based on version here
                    if (!constants) {
                        constants = constants_1.getConstantData(char.header.version);
                    }
                    return [4 /*yield*/, header_1.readHeaderData(char, reader, constants)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, attributes_1.readAttributes(char, reader, constants)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, skills_1.readSkills(char, reader, constants)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, items.readCharItems(char, reader, constants, config)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, items.readCorpseItems(char, reader, constants, config)];
                case 6:
                    _a.sent();
                    if (!char.header.status.expansion) return [3 /*break*/, 9];
                    return [4 /*yield*/, items.readMercItems(char, reader, constants, config)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, items.readGolemItems(char, reader, constants, config)];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9: return [4 /*yield*/, attribute_enhancer_1.enhanceAttributes(char, constants)];
                case 10:
                    _a.sent();
                    return [2 /*return*/, char];
            }
        });
    });
}
exports.read = read;
function readItem(buffer, version, constants, userConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var reader, config, item;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reader = new bitreader_1.BitReader(buffer);
                    config = Object.assign(defaultConfig, userConfig);
                    if (!constants) {
                        constants = constants_1.getConstantData(version);
                    }
                    return [4 /*yield*/, items.readItem(reader, version, constants, config)];
                case 1:
                    item = _a.sent();
                    return [4 /*yield*/, attribute_enhancer_1.enhanceItems([item], constants)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, item];
            }
        });
    });
}
exports.readItem = readItem;
function writer(buffer) {
    return new bitwriter_1.BitWriter();
}
exports.writer = writer;
function write(data, constants, userConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var config, writer, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        return __generator(this, function (_s) {
            switch (_s.label) {
                case 0:
                    config = Object.assign(defaultConfig, userConfig);
                    writer = new bitwriter_1.BitWriter();
                    _b = (_a = writer).WriteArray;
                    return [4 /*yield*/, header_1.writeHeader(data)];
                case 1:
                    _b.apply(_a, [_s.sent()]);
                    if (!constants) {
                        constants = constants_1.getConstantData(data.header.version);
                    }
                    _d = (_c = writer).WriteArray;
                    return [4 /*yield*/, header_1.writeHeaderData(data, constants)];
                case 2:
                    _d.apply(_c, [_s.sent()]);
                    _f = (_e = writer).WriteArray;
                    return [4 /*yield*/, attributes_1.writeAttributes(data, constants)];
                case 3:
                    _f.apply(_e, [_s.sent()]);
                    _h = (_g = writer).WriteArray;
                    return [4 /*yield*/, skills_1.writeSkills(data, constants)];
                case 4:
                    _h.apply(_g, [_s.sent()]);
                    _k = (_j = writer).WriteArray;
                    return [4 /*yield*/, items.writeCharItems(data, constants, config)];
                case 5:
                    _k.apply(_j, [_s.sent()]);
                    _m = (_l = writer).WriteArray;
                    return [4 /*yield*/, items.writeCorpseItem(data, constants, config)];
                case 6:
                    _m.apply(_l, [_s.sent()]);
                    if (!data.header.status.expansion) return [3 /*break*/, 9];
                    _p = (_o = writer).WriteArray;
                    return [4 /*yield*/, items.writeMercItems(data, constants, config)];
                case 7:
                    _p.apply(_o, [_s.sent()]);
                    _r = (_q = writer).WriteArray;
                    return [4 /*yield*/, items.writeGolemItems(data, constants, config)];
                case 8:
                    _r.apply(_q, [_s.sent()]);
                    _s.label = 9;
                case 9: return [4 /*yield*/, header_1.fixHeader(writer)];
                case 10:
                    _s.sent();
                    return [2 /*return*/, writer.ToArray()];
            }
        });
    });
}
exports.write = write;
function writeItem(item, version, constants, userConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var config, writer, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    config = Object.assign(defaultConfig, userConfig);
                    writer = new bitwriter_1.BitWriter();
                    if (!constants) {
                        constants = constants_1.getConstantData(version);
                    }
                    _b = (_a = writer).WriteArray;
                    return [4 /*yield*/, items.writeItem(item, version, constants, config)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/, writer.ToArray()];
            }
        });
    });
}
exports.writeItem = writeItem;


/***/ }),

/***/ "./src/d2/header.ts":
/*!**************************!*\
  !*** ./src/d2/header.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixHeader = exports.writeHeaderData = exports.writeHeader = exports.readHeaderData = exports.readHeader = void 0;
var bitwriter_1 = __webpack_require__(/*! ../binary/bitwriter */ "./src/binary/bitwriter.ts");
function readHeader(char, reader) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            char.header = {};
            //0x0000
            char.header.identifier = reader.ReadUInt32().toString(16).padStart(8, "0");
            if (char.header.identifier != "aa55aa55") {
                throw new Error("D2S identifier 'aa55aa55' not found at position " + (reader.offset - 4 * 8));
            }
            //0x0004
            char.header.version = reader.ReadUInt32();
            return [2 /*return*/];
        });
    });
}
exports.readHeader = readHeader;
function readHeaderData(char, reader, constants) {
    return __awaiter(this, void 0, void 0, function () {
        var v;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _versionSpecificHeader(char.header.version)];
                case 1:
                    v = _a.sent();
                    if (v == null) {
                        throw new Error("Cannot parse version: " + char.header.version);
                    }
                    v.readHeader(char, reader, constants);
                    return [2 /*return*/];
            }
        });
    });
}
exports.readHeaderData = readHeaderData;
function writeHeader(char) {
    return __awaiter(this, void 0, void 0, function () {
        var writer;
        return __generator(this, function (_a) {
            writer = new bitwriter_1.BitWriter();
            writer.WriteUInt32(parseInt(char.header.identifier, 16)).WriteUInt32(char.header.version);
            return [2 /*return*/, writer.ToArray()];
        });
    });
}
exports.writeHeader = writeHeader;
function writeHeaderData(char, constants) {
    return __awaiter(this, void 0, void 0, function () {
        var writer, v;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    writer = new bitwriter_1.BitWriter();
                    return [4 /*yield*/, _versionSpecificHeader(char.header.version)];
                case 1:
                    v = _a.sent();
                    if (v == null) {
                        throw new Error("Cannot parse version: " + char.header.version);
                    }
                    v.writeHeader(char, writer, constants);
                    return [2 /*return*/, writer.ToArray()];
            }
        });
    });
}
exports.writeHeaderData = writeHeaderData;
function fixHeader(writer) {
    return __awaiter(this, void 0, void 0, function () {
        var checksum, eof, i, byte;
        return __generator(this, function (_a) {
            checksum = 0;
            eof = writer.length / 8;
            writer.SeekByte(0x0008).WriteUInt32(eof);
            writer.SeekByte(0x000c).WriteUInt32(0);
            for (i = 0; i < eof; i++) {
                byte = writer.SeekByte(i).PeekBytes(1)[0];
                if (checksum & 0x80000000) {
                    byte += 1;
                }
                checksum = byte + checksum * 2;
                //hack make it a uint32
                checksum >>>= 0;
            }
            //checksum pos
            writer.SeekByte(0x000c).WriteUInt32(checksum);
            return [2 /*return*/];
        });
    });
}
exports.fixHeader = fixHeader;
/**
 * Save Version
 * 0x47, 0x0, 0x0, 0x0 = <1.06
 * 0x59, 0x0, 0x0, 0x0 = 1.08 = version
 * 0x5c, 0x0, 0x0, 0x0 = 1.09 = version
 * 0x60, 0x0, 0x0, 0x0 = 1.13c = version
 * 0x62, 0x0, 0x0, 0x0 = 1.2 = version
 * */
function _versionSpecificHeader(version) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = version;
                    switch (_a) {
                        case 0x60: return [3 /*break*/, 1];
                    }
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(__webpack_require__(/*! ./versions/default_header */ "./src/d2/versions/default_header.ts")); })];
                case 2: return [2 /*return*/, _b.sent()];
                case 3: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(__webpack_require__(/*! ./versions/default_header */ "./src/d2/versions/default_header.ts")); })];
                case 4: return [2 /*return*/, _b.sent()];
            }
        });
    });
}


/***/ }),

/***/ "./src/d2/items.ts":
/*!*************************!*\
  !*** ./src/d2/items.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._writeMagicProperties = exports._readMagicProperties = exports.writeItem = exports.readItem = exports.writeItems = exports.readItems = exports.writeCorpseItem = exports.readCorpseItems = exports.writeGolemItems = exports.readGolemItems = exports.writeMercItems = exports.readMercItems = exports.writeCharItems = exports.readCharItems = void 0;
var types = __importStar(__webpack_require__(/*! ./types */ "./src/d2/types.ts"));
var bitreader_1 = __webpack_require__(/*! ../binary/bitreader */ "./src/binary/bitreader.ts");
var bitwriter_1 = __webpack_require__(/*! ../binary/bitwriter */ "./src/binary/bitwriter.ts");
// prettier-ignore
//huffman tree
var HUFFMAN = [[[[["w", "u"], [["8", ["y", ["5", ["j", []]]]], "h"]], ["s", [["2", "n"], "x"]]], [[["c", ["k", "f"]], "b"], [["t", "m"], ["9", "7"]]]], [" ", [[[["e", "d"], "p"], ["g", [[["z", "q"], "3"], ["v", "6"]]]], [["r", "l"], ["a", [["1", ["4", "0"]], ["i", "o"]]]]]]];
// prettier-ignore
var HUFFMAN_LOOKUP = { "0": { "v": 223, "l": 8 }, "1": { "v": 31, "l": 7 }, "2": { "v": 12, "l": 6 }, "3": { "v": 91, "l": 7 }, "4": { "v": 95, "l": 8 }, "5": { "v": 104, "l": 8 }, "6": { "v": 123, "l": 7 }, "7": { "v": 30, "l": 5 }, "8": { "v": 8, "l": 6 }, "9": { "v": 14, "l": 5 }, " ": { "v": 1, "l": 2 }, "a": { "v": 15, "l": 5 }, "b": { "v": 10, "l": 4 }, "c": { "v": 2, "l": 5 }, "d": { "v": 35, "l": 6 }, "e": { "v": 3, "l": 6 }, "f": { "v": 50, "l": 6 }, "g": { "v": 11, "l": 5 }, "h": { "v": 24, "l": 5 }, "i": { "v": 63, "l": 7 }, "j": { "v": 232, "l": 9 }, "k": { "v": 18, "l": 6 }, "l": { "v": 23, "l": 5 }, "m": { "v": 22, "l": 5 }, "n": { "v": 44, "l": 6 }, "o": { "v": 127, "l": 7 }, "p": { "v": 19, "l": 5 }, "q": { "v": 155, "l": 8 }, "r": { "v": 7, "l": 5 }, "s": { "v": 4, "l": 4 }, "t": { "v": 6, "l": 5 }, "u": { "v": 16, "l": 5 }, "v": { "v": 59, "l": 7 }, "w": { "v": 0, "l": 5 }, "x": { "v": 28, "l": 5 }, "y": { "v": 40, "l": 7 }, "z": { "v": 27, "l": 8 } };
function readCharItems(char, reader, constants, config) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = char;
                    return [4 /*yield*/, readItems(reader, char.header.version, constants, config, char)];
                case 1:
                    _a.items = _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.readCharItems = readCharItems;
function writeCharItems(char, constants, config) {
    return __awaiter(this, void 0, void 0, function () {
        var writer, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    writer = new bitwriter_1.BitWriter();
                    _b = (_a = writer).WriteArray;
                    return [4 /*yield*/, writeItems(char.items, char.header.version, constants, config)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/, writer.ToArray()];
            }
        });
    });
}
exports.writeCharItems = writeCharItems;
function readMercItems(char, reader, constants, config) {
    return __awaiter(this, void 0, void 0, function () {
        var header, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    char.merc_items = [];
                    header = reader.ReadString(2);
                    if (header !== "jf") {
                        // header is not present in first save after char is created
                        if ((char === null || char === void 0 ? void 0 : char.header.level) === 1) {
                            return [2 /*return*/];
                        }
                        throw new Error("Mercenary header 'jf' not found at position " + (reader.offset - 2 * 8));
                    }
                    if (!(char.header.merc_id && parseInt(char.header.merc_id, 16) !== 0)) return [3 /*break*/, 2];
                    _a = char;
                    return [4 /*yield*/, readItems(reader, char.header.version, constants, config, char)];
                case 1:
                    _a.merc_items = _b.sent();
                    _b.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
exports.readMercItems = readMercItems;
function writeMercItems(char, constants, config) {
    return __awaiter(this, void 0, void 0, function () {
        var writer, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    writer = new bitwriter_1.BitWriter();
                    writer.WriteString("jf", 2);
                    if (!(char.header.merc_id && parseInt(char.header.merc_id, 16) !== 0)) return [3 /*break*/, 2];
                    char.merc_items = char.merc_items || [];
                    _b = (_a = writer).WriteArray;
                    return [4 /*yield*/, writeItems(char.merc_items, char.header.version, constants, config)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    _c.label = 2;
                case 2: return [2 /*return*/, writer.ToArray()];
            }
        });
    });
}
exports.writeMercItems = writeMercItems;
function readGolemItems(char, reader, constants, config) {
    return __awaiter(this, void 0, void 0, function () {
        var header, has_golem, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    header = reader.ReadString(2);
                    if (header !== "kf") {
                        // header is not present in first save after char is created
                        if ((char === null || char === void 0 ? void 0 : char.header.level) === 1) {
                            return [2 /*return*/];
                        }
                        throw new Error("Golem header 'kf' not found at position " + (reader.offset - 2 * 8));
                    }
                    has_golem = reader.ReadUInt8();
                    if (!(has_golem === 1)) return [3 /*break*/, 2];
                    _a = char;
                    return [4 /*yield*/, readItem(reader, char.header.version, constants, config)];
                case 1:
                    _a.golem_item = _b.sent();
                    _b.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
exports.readGolemItems = readGolemItems;
function writeGolemItems(char, constants, config) {
    return __awaiter(this, void 0, void 0, function () {
        var writer, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    writer = new bitwriter_1.BitWriter();
                    writer.WriteString("kf", 2);
                    if (!char.golem_item) return [3 /*break*/, 2];
                    writer.WriteUInt8(1);
                    _b = (_a = writer).WriteArray;
                    return [4 /*yield*/, writeItem(char.golem_item, char.header.version, constants, config)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [3 /*break*/, 3];
                case 2:
                    writer.WriteUInt8(0);
                    _c.label = 3;
                case 3: return [2 /*return*/, writer.ToArray()];
            }
        });
    });
}
exports.writeGolemItems = writeGolemItems;
function readCorpseItems(char, reader, constants, config) {
    return __awaiter(this, void 0, void 0, function () {
        var header, i, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    char.corpse_items = [];
                    header = reader.ReadString(2);
                    if (header !== "JM") {
                        // header is not present in first save after char is created
                        if (char.header.level === 1) {
                            char.is_dead = 0;
                            return [2 /*return*/];
                        }
                        throw new Error("Corpse header 'JM' not found at position " + (reader.offset - 2 * 8));
                    }
                    char.is_dead = reader.ReadUInt16(); //0x0002 [corpse count]
                    i = 0;
                    _d.label = 1;
                case 1:
                    if (!(i < char.is_dead)) return [3 /*break*/, 4];
                    reader.SkipBytes(12); //0x0004 [unk4, x_pos, y_pos]
                    _a = char;
                    _c = (_b = char.corpse_items).concat;
                    return [4 /*yield*/, readItems(reader, char.header.version, constants, config, char)];
                case 2:
                    _a.corpse_items = _c.apply(_b, [_d.sent()]);
                    _d.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.readCorpseItems = readCorpseItems;
function writeCorpseItem(char, constants, config) {
    return __awaiter(this, void 0, void 0, function () {
        var writer, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    writer = new bitwriter_1.BitWriter();
                    writer.WriteString("JM", 2);
                    writer.WriteUInt16(char.is_dead);
                    if (!char.is_dead) return [3 /*break*/, 2];
                    writer.WriteArray(new Uint8Array(12));
                    char.corpse_items = char.corpse_items || [];
                    _b = (_a = writer).WriteArray;
                    return [4 /*yield*/, writeItems(char.corpse_items, char.header.version, constants, config)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    _c.label = 2;
                case 2: return [2 /*return*/, writer.ToArray()];
            }
        });
    });
}
exports.writeCorpseItem = writeCorpseItem;
function readItems(reader, version, constants, config, char) {
    return __awaiter(this, void 0, void 0, function () {
        var items, header, count, i, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    items = [];
                    header = reader.ReadString(2);
                    if (header !== "JM") {
                        // header is not present in first save after char is created
                        if ((char === null || char === void 0 ? void 0 : char.header.level) === 1) {
                            return [2 /*return*/, []]; // TODO: return starter items based on class
                        }
                        throw new Error("Item list header 'JM' not found at position " + (reader.offset - 2 * 8));
                    }
                    count = reader.ReadUInt16();
                    i = 0;
                    _c.label = 1;
                case 1:
                    if (!(i < count)) return [3 /*break*/, 4];
                    _b = (_a = items).push;
                    return [4 /*yield*/, readItem(reader, version, constants, config)];
                case 2:
                    _b.apply(_a, [_c.sent()]);
                    _c.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, items];
            }
        });
    });
}
exports.readItems = readItems;
function writeItems(items, version, constants, config) {
    return __awaiter(this, void 0, void 0, function () {
        var writer, i, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    writer = new bitwriter_1.BitWriter();
                    writer.WriteString("JM", 2);
                    writer.WriteUInt16(items.length);
                    i = 0;
                    _c.label = 1;
                case 1:
                    if (!(i < items.length)) return [3 /*break*/, 4];
                    _b = (_a = writer).WriteArray;
                    return [4 /*yield*/, writeItem(items[i], version, constants, config)];
                case 2:
                    _b.apply(_a, [_c.sent()]);
                    _c.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, writer.ToArray()];
            }
        });
    });
}
exports.writeItems = writeItems;
function readItem(reader, version, originalConstants, config, parent) {
    return __awaiter(this, void 0, void 0, function () {
        var header, constants, item, i, prefix, arr, i, plist_flag, magic_attributes, i, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (version <= 0x60) {
                        header = reader.ReadString(2);
                        if (header !== "JM") {
                            throw new Error("Item header 'JM' not found at position " + (reader.offset - 2 * 8));
                        }
                    }
                    constants = originalConstants;
                    item = {};
                    _readSimpleBits(item, reader, version, constants, config);
                    if (!item.simple_item) {
                        item.id = reader.ReadUInt32(32);
                        item.level = reader.ReadUInt8(7);
                        item.quality = reader.ReadUInt8(4);
                        item.multiple_pictures = reader.ReadBit();
                        if (item.multiple_pictures) {
                            item.picture_id = reader.ReadUInt8(3);
                        }
                        item.class_specific = reader.ReadBit();
                        if (item.class_specific) {
                            item.auto_affix_id = reader.ReadUInt16(11);
                        }
                        switch (item.quality) {
                            case types.Quality.Low:
                                item.low_quality_id = reader.ReadUInt8(3);
                                break;
                            case types.Quality.Normal:
                                break;
                            case types.Quality.Superior:
                                item.file_index = reader.ReadUInt8(3);
                                break;
                            case types.Quality.Magic:
                                item.magic_prefix = reader.ReadUInt16(11);
                                if (item.magic_prefix)
                                    item.magic_prefix_name = constants.magic_prefixes[item.magic_prefix] ? constants.magic_prefixes[item.magic_prefix].n : null;
                                item.magic_suffix = reader.ReadUInt16(11);
                                if (item.magic_suffix)
                                    item.magic_suffix_name = constants.magic_suffixes[item.magic_suffix] ? constants.magic_suffixes[item.magic_suffix].n : null;
                                break;
                            case types.Quality.Set:
                                item.set_id = reader.ReadUInt16(12);
                                item.set_name = constants.set_items[item.set_id] ? constants.set_items[item.set_id].n : null;
                                break;
                            case types.Quality.Unique:
                                item.unique_id = reader.ReadUInt16(12);
                                item.unique_name = constants.unq_items[item.unique_id] ? constants.unq_items[item.unique_id].n : null;
                                break;
                            case types.Quality.Rare:
                            case types.Quality.Crafted:
                                item.rare_name_id = reader.ReadUInt8(8);
                                if (item.rare_name_id)
                                    item.rare_name = constants.rare_names[item.rare_name_id] ? constants.rare_names[item.rare_name_id].n : null;
                                item.rare_name_id2 = reader.ReadUInt8(8);
                                if (item.rare_name_id2)
                                    item.rare_name2 = constants.rare_names[item.rare_name_id2] ? constants.rare_names[item.rare_name_id2].n : null;
                                item.magical_name_ids = [];
                                for (i = 0; i < 6; i++) {
                                    prefix = reader.ReadBit();
                                    if (prefix === 1) {
                                        item.magical_name_ids[i] = reader.ReadUInt16(11);
                                    }
                                    else {
                                        item.magical_name_ids[i] = null;
                                    }
                                }
                                break;
                            default:
                                break;
                        }
                        if (item.given_runeword) {
                            item.runeword_id = reader.ReadUInt16(12);
                            //fix delerium on d2gs??? why is this a thing?
                            if (item.runeword_id == 2718) {
                                item.runeword_id = 48;
                            }
                            else if (item.runeword_id > 2783) {
                                item.runeword_id -= 2588;
                            }
                            if (constants.runewords[item.runeword_id]) {
                                item.runeword_name = constants.runewords[item.runeword_id].n;
                            }
                            reader.ReadUInt8(4);
                        }
                        if (item.personalized) {
                            arr = new Uint8Array(16);
                            for (i = 0; i < arr.length; i++) {
                                if (version > 0x61) {
                                    arr[i] = reader.ReadUInt8(8);
                                }
                                else {
                                    arr[i] = reader.ReadUInt8(7);
                                }
                                if (arr[i] === 0x00) {
                                    break;
                                }
                            }
                            item.personalized_name = new bitreader_1.BitReader(arr).ReadString(16).trim().replace(/\0/g, "");
                        }
                        //tomes
                        if (item.type === "tbk" || item.type == "ibk") {
                            reader.ReadUInt8(5);
                        }
                        //realm data
                        item.timestamp = reader.ReadUInt8(1);
                        if (item.type_id === types.ItemType.Armor) {
                            item.defense_rating = reader.ReadUInt16(constants.magical_properties[31].sB) - constants.magical_properties[31].sA;
                        }
                        if (item.type_id === types.ItemType.Armor || item.type_id === types.ItemType.Weapon) {
                            item.max_durability = reader.ReadUInt16(constants.magical_properties[73].sB) - constants.magical_properties[73].sA;
                            if (item.max_durability > 0) {
                                item.current_durability = reader.ReadUInt16(constants.magical_properties[72].sB) - constants.magical_properties[72].sA;
                            }
                        }
                        if (constants.stackables[item.type]) {
                            item.quantity = reader.ReadUInt16(9);
                        }
                        if (item.socketed === 1) {
                            item.total_nr_of_sockets = reader.ReadUInt8(4);
                        }
                        plist_flag = 0;
                        if (item.quality === types.Quality.Set) {
                            plist_flag = reader.ReadUInt8(5);
                            item.set_list_count = 0;
                            item._unknown_data.plist_flag = plist_flag;
                        }
                        magic_attributes = _readMagicProperties(reader, constants);
                        item.magic_attributes = magic_attributes;
                        while (plist_flag > 0) {
                            if (plist_flag & 1) {
                                item.set_list_count += 1;
                                magic_attributes = _readMagicProperties(reader, constants);
                                if (item.set_attributes) {
                                    item.set_attributes.push(magic_attributes);
                                }
                                else {
                                    item.set_attributes = [magic_attributes];
                                }
                            }
                            plist_flag >>>= 1;
                        }
                        if (item.given_runeword === 1) {
                            magic_attributes = _readMagicProperties(reader, constants);
                            if (magic_attributes && magic_attributes.length > 0) {
                                item.runeword_attributes = magic_attributes;
                            }
                        }
                    }
                    reader.Align();
                    if (!(item.nr_of_items_in_sockets > 0 && item.simple_item === 0)) return [3 /*break*/, 4];
                    item.socketed_items = [];
                    i = 0;
                    _c.label = 1;
                case 1:
                    if (!(i < item.nr_of_items_in_sockets)) return [3 /*break*/, 4];
                    _b = (_a = item.socketed_items).push;
                    return [4 /*yield*/, readItem(reader, version, constants, config, item)];
                case 2:
                    _b.apply(_a, [_c.sent()]);
                    _c.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: 
                //console.log(JSON.stringify(item));
                return [2 /*return*/, item];
            }
        });
    });
}
exports.readItem = readItem;
function writeItem(item, version, constants, config) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var writer, i, magical_name_id, runeword_id, name_1, i, set_attribute_count, plist_flag, i, i, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (item._unknown_data === undefined) {
                        item._unknown_data = {};
                    }
                    if (item.categories === undefined) {
                        item.categories = (_a = _GetItemTXT(item, constants)) === null || _a === void 0 ? void 0 : _a.c;
                    }
                    writer = new bitwriter_1.BitWriter();
                    if (version <= 0x60) {
                        writer.WriteString("JM", 2);
                    }
                    _writeSimpleBits(writer, version, item, constants, config);
                    if (!item.simple_item) {
                        writer.WriteUInt32(item.id, 32);
                        writer.WriteUInt8(item.level, 7);
                        writer.WriteUInt8(item.quality, 4);
                        writer.WriteUInt8(item.multiple_pictures, 1);
                        if (item.multiple_pictures) {
                            writer.WriteUInt8(item.picture_id, 3);
                        }
                        writer.WriteUInt8(item.class_specific, 1);
                        if (item.class_specific === 1) {
                            writer.WriteUInt16(item.auto_affix_id || 0, 11);
                        }
                        switch (item.quality) {
                            case types.Quality.Low:
                                writer.WriteUInt8(item.low_quality_id, 3);
                                break;
                            case types.Quality.Normal:
                                break;
                            case types.Quality.Superior:
                                writer.WriteUInt8(item.file_index || 0, 3);
                                break;
                            case types.Quality.Magic:
                                writer.WriteUInt16(item.magic_prefix, 11);
                                writer.WriteUInt16(item.magic_suffix, 11);
                                break;
                            case types.Quality.Set:
                                writer.WriteUInt16(item.set_id, 12);
                                break;
                            case types.Quality.Unique:
                                writer.WriteUInt16(item.unique_id, 12);
                                break;
                            case types.Quality.Rare:
                            case types.Quality.Crafted:
                                writer.WriteUInt8(item.rare_name_id !== undefined ? item.rare_name_id : _lookupRareId(item.rare_name, constants), 8);
                                writer.WriteUInt8(item.rare_name_id2 !== undefined ? item.rare_name_id2 : _lookupRareId(item.rare_name2, constants), 8);
                                for (i = 0; i < 6; i++) {
                                    magical_name_id = item.magical_name_ids[i];
                                    if (magical_name_id) {
                                        writer.WriteBit(1);
                                        writer.WriteUInt16(magical_name_id, 11);
                                    }
                                    else {
                                        writer.WriteBit(0);
                                    }
                                }
                                break;
                            default:
                                break;
                        }
                        if (item.given_runeword) {
                            runeword_id = item.runeword_id;
                            if (runeword_id == 2718) {
                                runeword_id = 48;
                            }
                            writer.WriteUInt16(runeword_id, 12);
                            writer.WriteUInt8(5, 4); //always 5?
                        }
                        if (item.personalized) {
                            name_1 = item.personalized_name.substring(0, 16);
                            for (i = 0; i < name_1.length; i++) {
                                if (version > 0x61) {
                                    writer.WriteUInt8(name_1.charCodeAt(i), 8);
                                }
                                else {
                                    writer.WriteUInt8(name_1.charCodeAt(i) & 0x7f, 7);
                                }
                            }
                            writer.WriteUInt8(0x00, version > 0x61 ? 8 : 7);
                        }
                        if (item.type === "tbk") {
                            writer.WriteUInt8(0, 5);
                        }
                        else if (item.type === "ibk") {
                            writer.WriteUInt8(1, 5);
                        }
                        writer.WriteUInt8(item.timestamp, 1);
                        if (item.type_id === types.ItemType.Armor || item.type_id === types.ItemType.Shield) {
                            writer.WriteUInt16(item.defense_rating + constants.magical_properties[31].sA, constants.magical_properties[31].sB);
                        }
                        if (item.type_id === types.ItemType.Armor || item.type_id === types.ItemType.Shield || item.type_id === types.ItemType.Weapon) {
                            writer.WriteUInt16(item.max_durability || 0, constants.magical_properties[73].sB);
                            if (item.max_durability > 0) {
                                writer.WriteUInt16(item.current_durability, constants.magical_properties[72].sB);
                            }
                        }
                        if (constants.stackables[item.type]) {
                            writer.WriteUInt16(item.quantity, 9);
                        }
                        if (item.socketed === 1) {
                            writer.WriteUInt8(item.total_nr_of_sockets, 4);
                        }
                        if (item.quality === types.Quality.Set) {
                            set_attribute_count = item.set_attributes != null ? item.set_attributes.length : 0;
                            plist_flag = (1 << set_attribute_count) - 1;
                            writer.WriteUInt8(item._unknown_data.plist_flag || plist_flag, 5);
                        }
                        _writeMagicProperties(writer, item.magic_attributes, constants);
                        if (item.set_attributes && item.set_attributes.length > 0) {
                            for (i = 0; i < item.set_attributes.length; i++) {
                                _writeMagicProperties(writer, item.set_attributes[i], constants);
                            }
                        }
                        if (item.given_runeword === 1) {
                            _writeMagicProperties(writer, item.runeword_attributes, constants);
                        }
                    }
                    writer.Align();
                    if (!(item.nr_of_items_in_sockets > 0 && item.simple_item === 0)) return [3 /*break*/, 4];
                    i = 0;
                    _d.label = 1;
                case 1:
                    if (!(i < item.nr_of_items_in_sockets)) return [3 /*break*/, 4];
                    _c = (_b = writer).WriteArray;
                    return [4 /*yield*/, writeItem(item.socketed_items[i], version, constants, config)];
                case 2:
                    _c.apply(_b, [_d.sent()]);
                    _d.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, writer.ToArray()];
            }
        });
    });
}
exports.writeItem = writeItem;
function _readSimpleBits(item, reader, version, constants, config) {
    var _a;
    //init so we do not have npe's
    item._unknown_data = {};
    //1.10-1.14d
    //[flags:32][version:10][mode:3]([invloc:4][x:4][y:4][page:3])([itemcode:32])([sockets:3])
    //1.15
    //[flags:32][version:3][mode:3]([invloc:4][x:4][y:4][page:3])([itemcode:variable])([sockets:3])
    item._unknown_data.b0_3 = reader.ReadBitArray(4);
    item.identified = reader.ReadBit();
    item._unknown_data.b5_10 = reader.ReadBitArray(6);
    item.socketed = reader.ReadBit();
    item._unknown_data.b12 = reader.ReadBitArray(1);
    item.new = reader.ReadBit();
    item._unknown_data.b14_15 = reader.ReadBitArray(2);
    item.is_ear = reader.ReadBit();
    item.starter_item = reader.ReadBit();
    item._unknown_data.b18_20 = reader.ReadBitArray(3);
    item.simple_item = reader.ReadBit();
    item.ethereal = reader.ReadBit();
    item._unknown_data.b23 = reader.ReadBitArray(1);
    item.personalized = reader.ReadBit();
    item._unknown_data.b25 = reader.ReadBitArray(1);
    item.given_runeword = reader.ReadBit();
    item._unknown_data.b27_31 = reader.ReadBitArray(5);
    if (version <= 0x60) {
        item.version = reader.ReadUInt16(10).toString(10);
    }
    else if (version >= 0x61) {
        item.version = reader.ReadUInt16(3).toString(2);
    }
    item.location_id = reader.ReadUInt8(3);
    item.equipped_id = reader.ReadUInt8(4);
    item.position_x = reader.ReadUInt8(4);
    item.position_y = reader.ReadUInt8(4);
    item.alt_position_id = reader.ReadUInt8(3);
    if (item.is_ear) {
        var clazz = reader.ReadUInt8(3);
        var level = reader.ReadUInt8(7);
        var arr = new Uint8Array(15);
        for (var i = 0; i < arr.length; i++) {
            arr[i] = reader.ReadUInt8(7);
            if (arr[i] === 0x00) {
                break;
            }
        }
        var name_2 = new bitreader_1.BitReader(arr).ReadString(15).trim().replace(/\0/g, "");
        item.ear_attributes = {
            class: clazz,
            level: level,
            name: name_2,
        };
    }
    else {
        if (version <= 0x60) {
            item.type = reader.ReadString(4);
        }
        else if (version >= 0x61) {
            item.type = "";
            //props to d07riv
            //https://github.com/d07RiV/d07riv.github.io/blob/master/d2r.html#L11-L20
            for (var i = 0; i < 4; i++) {
                var node = HUFFMAN;
                do {
                    node = node[reader.ReadBit()];
                } while (Array.isArray(node));
                item.type += node;
            }
        }
        item.type = item.type.trim().replace(/\0/g, "");
        var details = _GetItemTXT(item, constants);
        item.categories = details === null || details === void 0 ? void 0 : details.c;
        if (item === null || item === void 0 ? void 0 : item.categories.includes("Any Armor")) {
            item.type_id = types.ItemType.Armor;
        }
        else if (item === null || item === void 0 ? void 0 : item.categories.includes("Weapon")) {
            item.type_id = types.ItemType.Weapon;
            details = constants.weapon_items[item.type];
        }
        else {
            item.type_id = types.ItemType.Other;
        }
        var bits = item.simple_item ? 1 : 3;
        if ((_a = item.categories) === null || _a === void 0 ? void 0 : _a.includes("Quest")) {
            item.quest_difficulty = reader.ReadUInt16(constants.magical_properties[356].sB) - constants.magical_properties[356].sA;
            bits = 1;
        }
        item.nr_of_items_in_sockets = reader.ReadUInt8(bits);
    }
}
function _lookupRareId(name, constants) {
    //some inconsistencies with txt data and nokka. so have to hack it with startsWith
    return constants.rare_names.findIndex(function (k) { return k && (k.n.toLowerCase().startsWith(name.toLowerCase()) || name.toLowerCase().startsWith(k.n.toLowerCase())); });
}
function _writeSimpleBits(writer, version, item, constants, config) {
    var _a;
    writer.WriteBits(item._unknown_data.b0_3 || new Uint8Array(4), 4);
    writer.WriteBit(item.identified);
    writer.WriteBits(item._unknown_data.b5_10 || new Uint8Array(6), 6);
    writer.WriteBit(item.socketed);
    writer.WriteBits(item._unknown_data.b12 || new Uint8Array(1), 1);
    writer.WriteBit(item.new);
    writer.WriteBits(item._unknown_data.b14_15 || new Uint8Array(2), 2);
    writer.WriteBit(item.is_ear);
    writer.WriteBit(item.starter_item);
    writer.WriteBits(item._unknown_data.b18_20 || new Uint8Array(3), 3);
    writer.WriteBit(item.simple_item);
    writer.WriteBit(item.ethereal);
    writer.WriteBits(item._unknown_data.b23 || new Uint8Array([1]), 1); //always 1? IFLAG_JUSTSAVED
    writer.WriteBit(item.personalized);
    writer.WriteBits(item._unknown_data.b25 || new Uint8Array(1), 1); //IFLAG_LOWQUALITY
    writer.WriteBit(item.given_runeword);
    writer.WriteBits(item._unknown_data.b27_31 || new Uint8Array(5), 5);
    var itemVersion = item.version != null ? item.version : "101";
    if (version <= 0x60) {
        // 0 = pre-1.08; 1 = 1.08/1.09 normal; 2 = 1.10 normal; 100 = 1.08/1.09 expansion; 101 = 1.10 expansion
        writer.WriteUInt16(parseInt(itemVersion, 10), 10);
    }
    else if (version >= 0x61) {
        writer.WriteUInt16(parseInt(itemVersion, 2), 3);
    }
    writer.WriteUInt8(item.location_id, 3);
    writer.WriteUInt8(item.equipped_id, 4);
    writer.WriteUInt8(item.position_x, 4);
    writer.WriteUInt8(item.position_y, 4);
    writer.WriteUInt8(item.alt_position_id, 3);
    if (item.is_ear) {
        writer.WriteUInt8(item.ear_attributes.class, 3);
        writer.WriteUInt8(item.ear_attributes.level, 7);
        var name_3 = item.ear_attributes.name.substring(0, 15);
        for (var i = 0; i < name_3.length; i++) {
            writer.WriteUInt8(name_3.charCodeAt(i) & 0x7f, 7);
        }
        writer.WriteUInt8(0x00, 7);
    }
    else {
        var t = item.type.padEnd(4, " ");
        if (version <= 0x60) {
            writer.WriteString(t, 4);
        }
        else {
            for (var _i = 0, t_1 = t; _i < t_1.length; _i++) {
                var c = t_1[_i];
                var n = HUFFMAN_LOOKUP[c];
                writer.WriteUInt16(n.v, n.l);
            }
        }
        var bits = item.simple_item ? 1 : 3;
        if ((_a = item.categories) === null || _a === void 0 ? void 0 : _a.includes("Quest")) {
            var difficulty = item.quest_difficulty || 0;
            writer.WriteUInt16(difficulty + constants.magical_properties[356].sA, constants.magical_properties[356].sB);
            bits = 1;
        }
        writer.WriteUInt8(item.nr_of_items_in_sockets, bits);
    }
}
function _readMagicProperties(reader, constants) {
    var id = reader.ReadUInt16(9);
    var magic_attributes = [];
    while (id != 0x1ff) {
        var values = [];
        if (id > constants.magical_properties.length) {
            throw new Error("Invalid Stat Id: " + id + " at position " + (reader.offset - 9));
        }
        var num_of_properties = constants.magical_properties[id].np || 1;
        for (var i = 0; i < num_of_properties; i++) {
            var prop = constants.magical_properties[id + i];
            if (prop == null) {
                throw new Error("Cannot find Magical Property for id: " + id + " at position " + reader.offset);
            }
            if (prop.sP) {
                var param = reader.ReadUInt16(prop.sP);
                switch (prop.dF) {
                    case 14: //TODO +skill to skilltab
                        values.push(param & 0x7);
                        param = (param >> 3) & 0x1fff;
                        break;
                    default:
                        break;
                }
                //encode
                switch (prop.e) {
                    case 1:
                        //throw new Error(`Unimplemented encoding: ${prop.encode}`);
                        break;
                    case 2: //chance to cast
                    case 3: //charges
                        values.push(param & 0x3f); //skill level
                        param = (param >> 6) & 0x3ff; //skll id
                        break;
                    default:
                        break;
                }
                values.push(param);
            }
            if (!prop.sB) {
                throw new Error("Save Bits is undefined for stat: " + id + ":" + prop.s + " at position " + reader.offset);
            }
            var v = reader.ReadUInt16(prop.sB);
            if (prop.sA) {
                v -= prop.sA;
            }
            switch (prop.e) {
                case 3:
                    values.push(v & 0xff); // current charges
                    values.push((v >> 8) & 0xff); //max charges
                    break;
                default:
                    values.push(v);
                    break;
            }
        }
        magic_attributes.push({
            id: id,
            values: values,
            name: constants.magical_properties[id].s,
        });
        id = reader.ReadUInt16(9);
    }
    return magic_attributes;
}
exports._readMagicProperties = _readMagicProperties;
function _writeMagicProperties(writer, properties, constants) {
    if (properties) {
        for (var i = 0; i < properties.length; i++) {
            var property = properties[i];
            var valueIdx = 0;
            writer.WriteUInt16(property.id, 9);
            var num_of_properties = constants.magical_properties[property.id].np || 1;
            for (var j = 0; j < num_of_properties; j++) {
                var prop = constants.magical_properties[property.id + j];
                if (prop == null) {
                    throw new Error("Cannot find Magical Property for id: " + property.id);
                }
                if (prop.sP) {
                    var param = property.values[valueIdx++];
                    switch (prop.dF) {
                        case 14: //+skill to skilltab
                            param |= (property.values[valueIdx++] & 0x1fff) << 3;
                            break;
                        default:
                            break;
                    }
                    //encode
                    switch (prop.e) {
                        case 1:
                            //throw new Error(`Unimplemented encoding: ${prop.encode}`);
                            break;
                        case 2: //chance to cast
                        case 3: //charges
                            param |= (property.values[valueIdx++] & 0x3ff) << 6;
                            break;
                        default:
                            break;
                    }
                    writer.WriteUInt32(param, prop.sP);
                }
                var v = property.values[valueIdx++];
                if (prop.sA) {
                    v += prop.sA;
                }
                switch (prop.e) {
                    case 3:
                        v |= (property.values[valueIdx++] & 0xff) << 8;
                        break;
                    default:
                        break;
                }
                if (!prop.sB) {
                    throw new Error("Save Bits is undefined for stat: " + property.id + ":" + prop.s);
                }
                writer.WriteUInt32(v, prop.sB);
            }
        }
    }
    writer.WriteUInt16(0x1ff, 9);
}
exports._writeMagicProperties = _writeMagicProperties;
function _GetItemTXT(item, constants) {
    if (constants.armor_items[item.type]) {
        return constants.armor_items[item.type];
    }
    else if (constants.weapon_items[item.type]) {
        return constants.weapon_items[item.type];
    }
    else if (constants.other_items[item.type]) {
        return constants.other_items[item.type];
    }
}


/***/ }),

/***/ "./src/d2/skills.ts":
/*!**************************!*\
  !*** ./src/d2/skills.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeSkills = exports.readSkills = void 0;
var bitwriter_1 = __webpack_require__(/*! ../binary/bitwriter */ "./src/binary/bitwriter.ts");
function readSkills(char, reader, constants) {
    return __awaiter(this, void 0, void 0, function () {
        var offset, header, i, id;
        return __generator(this, function (_a) {
            char.skills = [];
            offset = SkillOffset[char.header.class];
            header = reader.ReadString(2);
            if (header !== "if") {
                // header is not present in first save after char is created
                if (char.header.level === 1) {
                    return [2 /*return*/]; // TODO: return starter skills based on class
                }
                throw new Error("Skills header 'if' not found at position " + (reader.offset - 2 * 8));
            }
            for (i = 0; i < 30; i++) {
                id = offset + i;
                char.skills.push({
                    id: id,
                    points: reader.ReadUInt8(),
                    name: constants.skills[id].s,
                });
            }
            return [2 /*return*/];
        });
    });
}
exports.readSkills = readSkills;
function writeSkills(char, constants) {
    return __awaiter(this, void 0, void 0, function () {
        var writer, i;
        return __generator(this, function (_a) {
            writer = new bitwriter_1.BitWriter();
            writer.WriteString("if", 2); //0x0000 [skills header = 0x69, 0x66 "if"]
            //probably array length checking/sorting of skills by id...
            for (i = 0; i < 30; i++) {
                writer.WriteUInt8(char.skills[i].points);
            }
            return [2 /*return*/, writer.ToArray()];
        });
    });
}
exports.writeSkills = writeSkills;
var SkillOffset = {
    Amazon: 6,
    Sorceress: 36,
    Necromancer: 66,
    Paladin: 96,
    Barbarian: 126,
    Druid: 221,
    Assassin: 251,
};


/***/ }),

/***/ "./src/d2/stash.ts":
/*!*************************!*\
  !*** ./src/d2/stash.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeStash = exports.readStash = void 0;
var types = __importStar(__webpack_require__(/*! ./types */ "./src/d2/types.ts"));
var bitwriter_1 = __webpack_require__(/*! ../binary/bitwriter */ "./src/binary/bitwriter.ts");
var items = __importStar(__webpack_require__(/*! ./items */ "./src/d2/items.ts"));
var attribute_enhancer_1 = __webpack_require__(/*! ./attribute_enhancer */ "./src/d2/attribute_enhancer.ts");
var bitreader_1 = __webpack_require__(/*! ../binary/bitreader */ "./src/binary/bitreader.ts");
var constants_1 = __webpack_require__(/*! ./constants */ "./src/d2/constants.ts");
var defaultConfig = {
    extendedStash: false,
};
function readStash(buffer, constants, version, userConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var stash, reader, config, firstHeader, pageCount, saveVersion, saveVersion;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    stash = {};
                    reader = new bitreader_1.BitReader(buffer);
                    config = Object.assign(defaultConfig, userConfig);
                    firstHeader = reader.ReadUInt32();
                    reader.SeekByte(0);
                    if (!(firstHeader == 0xaa55aa55)) return [3 /*break*/, 5];
                    stash.pages = [];
                    pageCount = 0;
                    _a.label = 1;
                case 1:
                    if (!(reader.offset < reader.bits.length)) return [3 /*break*/, 4];
                    pageCount++;
                    return [4 /*yield*/, readStashHeader(stash, reader)];
                case 2:
                    _a.sent();
                    saveVersion = version || parseInt(stash.version);
                    if (!constants) {
                        constants = constants_1.getConstantData(saveVersion);
                    }
                    return [4 /*yield*/, readStashPart(stash, reader, saveVersion, constants)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 1];
                case 4:
                    stash.pageCount = pageCount;
                    return [3 /*break*/, 8];
                case 5: return [4 /*yield*/, readStashHeader(stash, reader)];
                case 6:
                    _a.sent();
                    saveVersion = version || parseInt(stash.version);
                    if (!constants) {
                        constants = constants_1.getConstantData(saveVersion);
                    }
                    return [4 /*yield*/, readStashPages(stash, reader, saveVersion, constants)];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8: return [2 /*return*/, stash];
            }
        });
    });
}
exports.readStash = readStash;
function readStashHeader(stash, reader) {
    return __awaiter(this, void 0, void 0, function () {
        var header;
        return __generator(this, function (_a) {
            header = reader.ReadUInt32();
            switch (header) {
                // Resurrected
                case 0xaa55aa55:
                    stash.type = types.EStashType.shared;
                    stash.hardcore = reader.ReadUInt32() == 0;
                    stash.version = reader.ReadUInt32().toString();
                    stash.sharedGold = reader.ReadUInt32();
                    reader.ReadUInt32(); // size of the sector
                    reader.SkipBytes(44); // empty
                    break;
                // LoD
                case 0x535353: // SSS
                case 0x4d545343: // CSTM
                    stash.version = reader.ReadString(2);
                    if (stash.version !== "01" && stash.version !== "02") {
                        throw new Error("unkown stash version " + stash.version + " at position " + (reader.offset - 2 * 8));
                    }
                    stash.type = header === 0x535353 ? types.EStashType.shared : types.EStashType.private;
                    if (stash.type === types.EStashType.shared && stash.version == "02") {
                        stash.sharedGold = reader.ReadUInt32();
                    }
                    if (stash.type === types.EStashType.private) {
                        reader.ReadUInt32();
                        stash.sharedGold = 0;
                    }
                    stash.pageCount = reader.ReadUInt32();
                    break;
                default:
                    debugger;
                    throw new Error("shared stash header 'SSS' / 0xAA55AA55 / private stash header 'CSTM' not found at position " + (reader.offset - 3 * 8));
            }
            return [2 /*return*/];
        });
    });
}
function readStashPages(stash, reader, version, constants) {
    return __awaiter(this, void 0, void 0, function () {
        var i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    stash.pages = [];
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < stash.pageCount)) return [3 /*break*/, 4];
                    return [4 /*yield*/, readStashPage(stash, reader, version, constants)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function readStashPage(stash, reader, version, constants) {
    return __awaiter(this, void 0, void 0, function () {
        var page, header, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    page = {
                        items: [],
                        name: "",
                        type: 0,
                    };
                    header = reader.ReadString(2);
                    if (header !== "ST") {
                        throw new Error("can not read stash page header ST at position " + (reader.offset - 2 * 8));
                    }
                    page.type = reader.ReadUInt32();
                    page.name = reader.ReadNullTerminatedString();
                    _a = page;
                    return [4 /*yield*/, items.readItems(reader, version, constants, defaultConfig)];
                case 1:
                    _a.items = _b.sent();
                    attribute_enhancer_1.enhanceItems(page.items, constants);
                    stash.pages.push(page);
                    return [2 /*return*/];
            }
        });
    });
}
function readStashPart(stash, reader, version, constants) {
    return __awaiter(this, void 0, void 0, function () {
        var page, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    page = {
                        items: [],
                        name: "",
                        type: 0,
                    };
                    _a = page;
                    return [4 /*yield*/, items.readItems(reader, version, constants, defaultConfig)];
                case 1:
                    _a.items = _b.sent();
                    attribute_enhancer_1.enhanceItems(page.items, constants);
                    stash.pages.push(page);
                    return [2 /*return*/];
            }
        });
    });
}
function writeStash(data, constants, version, userConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var config, writer, _i, _a, page, _b, _c, _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    config = Object.assign(defaultConfig, userConfig);
                    writer = new bitwriter_1.BitWriter();
                    if (!constants) {
                        constants = constants_1.getConstantData(version);
                    }
                    if (!(version > 0x61)) return [3 /*break*/, 5];
                    _i = 0, _a = data.pages;
                    _h.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    page = _a[_i];
                    _c = (_b = writer).WriteArray;
                    return [4 /*yield*/, writeStashSection(data, page, constants, config)];
                case 2:
                    _c.apply(_b, [_h.sent()]);
                    _h.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 8];
                case 5:
                    _e = (_d = writer).WriteArray;
                    return [4 /*yield*/, writeStashHeader(data)];
                case 6:
                    _e.apply(_d, [_h.sent()]);
                    _g = (_f = writer).WriteArray;
                    return [4 /*yield*/, writeStashPages(data, version, constants, config)];
                case 7:
                    _g.apply(_f, [_h.sent()]);
                    _h.label = 8;
                case 8: return [2 /*return*/, writer.ToArray()];
            }
        });
    });
}
exports.writeStash = writeStash;
function writeStashHeader(data) {
    return __awaiter(this, void 0, void 0, function () {
        var writer;
        return __generator(this, function (_a) {
            writer = new bitwriter_1.BitWriter();
            if (data.type === types.EStashType.private) {
                writer.WriteString("CSTM", 4);
            }
            else {
                writer.WriteString("SSS", 4);
            }
            writer.WriteString(data.version, data.version.length);
            if (data.type === types.EStashType.private) {
                writer.WriteString("", 4);
            }
            else {
                if (data.version == "02") {
                    writer.WriteUInt32(data.sharedGold);
                }
            }
            writer.WriteUInt32(data.pages.length);
            return [2 /*return*/, writer.ToArray()];
        });
    });
}
function writeStashSection(data, page, constants, userConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var writer, _a, _b, size;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    writer = new bitwriter_1.BitWriter();
                    writer.WriteUInt32(0xaa55aa55);
                    writer.WriteUInt32(data.hardcore ? 0 : 1);
                    writer.WriteUInt32(0x62);
                    writer.WriteUInt32(data.sharedGold);
                    writer.WriteUInt32(0); // size of the sector, to be fixed later
                    writer.WriteBytes(new Uint8Array(44).fill(0)); // empty
                    _b = (_a = writer).WriteArray;
                    return [4 /*yield*/, items.writeItems(page.items, 0x62, constants, userConfig)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    size = writer.offset;
                    writer.SeekByte(16);
                    writer.WriteUInt32(Math.ceil(size / 8));
                    return [2 /*return*/, writer.ToArray()];
            }
        });
    });
}
function writeStashPages(data, version, constants, config) {
    return __awaiter(this, void 0, void 0, function () {
        var writer, i, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    writer = new bitwriter_1.BitWriter();
                    i = 0;
                    _c.label = 1;
                case 1:
                    if (!(i < data.pages.length)) return [3 /*break*/, 4];
                    _b = (_a = writer).WriteArray;
                    return [4 /*yield*/, writeStashPage(data.pages[i], version, constants, config)];
                case 2:
                    _b.apply(_a, [_c.sent()]);
                    _c.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, writer.ToArray()];
            }
        });
    });
}
function writeStashPage(data, version, constants, config) {
    return __awaiter(this, void 0, void 0, function () {
        var writer, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    writer = new bitwriter_1.BitWriter();
                    writer.WriteString("ST", 2);
                    writer.WriteUInt32(data.type);
                    writer.WriteString(data.name, data.name.length + 1);
                    _b = (_a = writer).WriteArray;
                    return [4 /*yield*/, items.writeItems(data.items, version, constants, config)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/, writer.ToArray()];
            }
        });
    });
}


/***/ }),

/***/ "./src/d2/types.ts":
/*!*************************!*\
  !*** ./src/d2/types.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemType = exports.Quality = exports.EItemQuality = exports.EStashType = void 0;
var EStashType;
(function (EStashType) {
    EStashType[EStashType["shared"] = 0] = "shared";
    EStashType[EStashType["private"] = 1] = "private";
})(EStashType = exports.EStashType || (exports.EStashType = {}));
var EItemQuality;
(function (EItemQuality) {
    EItemQuality[EItemQuality["normal"] = 0] = "normal";
    EItemQuality[EItemQuality["exceptional"] = 1] = "exceptional";
    EItemQuality[EItemQuality["elite"] = 2] = "elite";
})(EItemQuality = exports.EItemQuality || (exports.EItemQuality = {}));
var Quality;
(function (Quality) {
    Quality[Quality["Low"] = 1] = "Low";
    Quality[Quality["Normal"] = 2] = "Normal";
    Quality[Quality["Superior"] = 3] = "Superior";
    Quality[Quality["Magic"] = 4] = "Magic";
    Quality[Quality["Set"] = 5] = "Set";
    Quality[Quality["Rare"] = 6] = "Rare";
    Quality[Quality["Unique"] = 7] = "Unique";
    Quality[Quality["Crafted"] = 8] = "Crafted";
})(Quality = exports.Quality || (exports.Quality = {}));
var ItemType;
(function (ItemType) {
    ItemType[ItemType["Armor"] = 1] = "Armor";
    ItemType[ItemType["Shield"] = 2] = "Shield";
    ItemType[ItemType["Weapon"] = 3] = "Weapon";
    ItemType[ItemType["Other"] = 4] = "Other";
})(ItemType = exports.ItemType || (exports.ItemType = {}));


/***/ }),

/***/ "./src/d2/versions/default_header.ts":
/*!*******************************************!*\
  !*** ./src/d2/versions/default_header.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.writeHeader = exports.readHeader = void 0;
var bitreader_1 = __webpack_require__(/*! ../../binary/bitreader */ "./src/binary/bitreader.ts");
var bitwriter_1 = __webpack_require__(/*! ../../binary/bitwriter */ "./src/binary/bitwriter.ts");
var difficulties = ["normal", "nm", "hell"];
function readHeader(char, reader, constants) {
    var _a, _b, _c, _d;
    char.header.filesize = reader.ReadUInt32(); //0x0008
    char.header.checksum = reader.ReadUInt32().toString(16).padStart(8, "0"); //0x000c
    reader.SkipBytes(4); //0x0010
    if (char.header.version > 0x61) {
        reader.SeekByte(267);
    }
    char.header.name = reader.ReadString(16).replace(/\0/g, ""); //0x0014
    if (char.header.version > 0x61) {
        reader.SeekByte(36);
    }
    char.header.status = _readStatus(reader.ReadUInt8()); //0x0024
    char.header.progression = reader.ReadUInt8(); //0x0025
    char.header.active_arms = reader.ReadUInt16(); //0x0026 [unk = 0x0, 0x0]
    char.header.class = constants.classes[reader.ReadUInt8()].n; //0x0028
    reader.SkipBytes(2); //0x0029 [unk = 0x10, 0x1E]
    char.header.level = reader.ReadUInt8(); //0x002b
    char.header.created = reader.ReadUInt32(); //0x002c
    char.header.last_played = reader.ReadUInt32(); //0x0030
    reader.SkipBytes(4); //0x0034 [unk = 0xff, 0xff, 0xff, 0xff]
    char.header.assigned_skills = _readAssignedSkills(reader.ReadArray(64), constants); //0x0038
    char.header.left_skill = (_a = constants.skills[reader.ReadUInt32()]) === null || _a === void 0 ? void 0 : _a.s; //0x0078
    char.header.right_skill = (_b = constants.skills[reader.ReadUInt32()]) === null || _b === void 0 ? void 0 : _b.s; //0x007c
    char.header.left_swap_skill = (_c = constants.skills[reader.ReadUInt32()]) === null || _c === void 0 ? void 0 : _c.s; //0x0080
    char.header.right_swap_skill = (_d = constants.skills[reader.ReadUInt32()]) === null || _d === void 0 ? void 0 : _d.s; //0x0084
    char.header.menu_appearance = _readCharMenuAppearance(reader.ReadArray(32), constants); //0x0088 [char menu appearance]
    char.header.difficulty = _readDifficulty(reader.ReadArray(3)); //0x00a8
    char.header.map_id = reader.ReadUInt32(); //0x00ab
    reader.SkipBytes(2); //0x00af [unk = 0x0, 0x0]
    char.header.dead_merc = reader.ReadUInt16(); //0x00b1
    char.header.merc_id = reader.ReadUInt32().toString(16); //0x00b3
    char.header.merc_name_id = reader.ReadUInt16(); //0x00b7
    char.header.merc_type = reader.ReadUInt16(); //0x00b9
    char.header.merc_experience = reader.ReadUInt32(); //0x00bb
    reader.SkipBytes(144); //0x00bf [unk]
    reader.SkipBytes(4); //0x014f [quests header identifier = 0x57, 0x6f, 0x6f, 0x21 "Woo!"]
    reader.SkipBytes(4); //0x0153 [version = 0x6, 0x0, 0x0, 0x0]
    reader.SkipBytes(2); //0x0153 [quests header length = 0x2a, 0x1]
    char.header.quests_normal = _readQuests(reader.ReadArray(96)); //0x0159
    char.header.quests_nm = _readQuests(reader.ReadArray(96)); //0x01b9
    char.header.quests_hell = _readQuests(reader.ReadArray(96)); //0x0219
    reader.SkipBytes(2); //0x0279 [waypoint header identifier = 0x57, 0x53 "WS"]
    reader.SkipBytes(4); //0x027b [waypoint header version = 0x1, 0x0, 0x0, 0x0]
    reader.SkipBytes(2); //0x027f [waypoint header length = 0x50, 0x0]
    char.header.waypoints = _readWaypointData(reader.ReadArray(0x48)); //0x0281
    reader.SkipBytes(2); //0x02c9 [npc header identifier  = 0x01, 0x77 ".w"]
    reader.SkipBytes(2); //0x02ca [npc header length = 0x34]
    char.header.npcs = _readNPCData(reader.ReadArray(0x30)); //0x02cc
}
exports.readHeader = readHeader;
function writeHeader(char, writer, constants) {
    writer
        .WriteUInt32(0x0) //0x0008 (filesize. needs to be writen after all data)
        .WriteUInt32(0x0); //0x000c (checksum. needs to be calculated after all data writer)
    if (char.header.version > 0x61) {
        writer.WriteArray(new Uint8Array(Array(20).fill(0))); // 0x0010
    }
    else {
        writer
            .WriteArray(new Uint8Array([0x00, 0x00, 0x00, 0x00])) //0x0010
            .WriteString(char.header.name, 16); //0x0014
    }
    writer
        .WriteArray(_writeStatus(char.header.status)) //0x0024
        .WriteUInt8(char.header.progression) //0x0025
        .WriteUInt16(char.header.active_arms) //0x0026
        .WriteUInt8(_classId(char.header.class, constants)) //0x0028
        .WriteArray(new Uint8Array([0x10, 0x1e])) //0x0029
        .WriteUInt8(char.header.level) //0x002b
        .WriteArray(new Uint8Array([0x00, 0x00, 0x00, 0x00])) //0x002c
        .WriteUInt32(char.header.last_played) //0x0030
        .WriteArray(new Uint8Array([0xff, 0xff, 0xff, 0xff])) //0x0034
        .WriteArray(_writeAssignedSkills(char.header.assigned_skills, constants)) //0x0038
        .WriteUInt32(_skillId(char.header.left_skill, constants)) //0x0078
        .WriteUInt32(_skillId(char.header.right_skill, constants)) //0x007c
        .WriteUInt32(_skillId(char.header.left_swap_skill, constants)) //0x0080
        .WriteUInt32(_skillId(char.header.right_swap_skill, constants)) //0x0084
        .WriteArray(_writeCharMenuAppearance(char.header.menu_appearance, constants)) //0x0088 [char menu appearance]
        .WriteArray(_writeDifficulty(char.header.difficulty)) //0x00a8
        .WriteUInt32(char.header.map_id) //0x00ab
        .WriteArray(new Uint8Array([0x00, 0x00])) //0x00af [unk = 0x0, 0x0]
        .WriteUInt16(char.header.dead_merc) //0x00b1
        .WriteUInt32(parseInt(char.header.merc_id, 16)) //0x00b3
        .WriteUInt16(char.header.merc_name_id) //0x00b7
        .WriteUInt16(char.header.merc_type) //0x00b9
        .WriteUInt32(char.header.merc_experience); //0x00bb
    if (char.header.version > 0x61) {
        writer
            .WriteArray(new Uint8Array(76)) //0x00bf [unk]
            .WriteString(char.header.name, 16) //0x010b
            .WriteArray(new Uint8Array(52)); //0x011b [unk]
    }
    else {
        writer
            .WriteArray(new Uint8Array(140)) //0x00bf [unk]
            .WriteUInt32(0x1); //0x014b [unk = 0x1, 0x0, 0x0, 0x0]
    }
    writer
        .WriteString("Woo!", 4) //0x014f [quests = 0x57, 0x6f, 0x6f, 0x21 "Woo!"]
        .WriteArray(new Uint8Array([0x06, 0x00, 0x00, 0x00, 0x2a, 0x01])) //0x0153 [unk = 0x6, 0x0, 0x0, 0x0, 0x2a, 0x1]
        .WriteArray(_writeQuests(char.header.quests_normal)) //0x0159
        .WriteArray(_writeQuests(char.header.quests_nm)) //0x01b9
        .WriteArray(_writeQuests(char.header.quests_hell)) //0x0219
        .WriteString("WS", 2) //0x0279 [waypoint data = 0x57, 0x53 "WS"]
        .WriteArray(new Uint8Array([0x01, 0x00, 0x00, 0x00, 0x50, 0x00])) //0x027b [unk = 0x1, 0x0, 0x0, 0x0, 0x50, 0x0]
        .WriteArray(_writeWaypointData(char.header.waypoints)) //0x0281
        .WriteArray(new Uint8Array([0x01, 0x77])) //0x02c9 [npc header = 0x01, 0x77 ".w"]
        .WriteUInt16(0x34) //0x02ca [npc struct length]
        .WriteArray(_writeNPCData(char.header.npcs)); //0x02cc [npc introduction data... unk]
}
exports.writeHeader = writeHeader;
function _classId(name, constants) {
    if (!name)
        return -1;
    return constants.classes.findIndex(function (c) { return c && c.n == name; });
}
function _skillId(name, constants) {
    //default to "attack" if empty string or can't find spellname.
    if (name === "")
        return 0;
    if (!name)
        return -1;
    var idx = constants.skills.findIndex(function (s) { return s && s.s == name; });
    return idx >= 0 ? idx : 0;
}
function _readStatus(byte) {
    var status = {};
    status.hardcore = ((byte >>> 2) & 1) === 1;
    status.died = ((byte >>> 3) & 1) === 1;
    status.expansion = ((byte >>> 5) & 1) === 1;
    status.ladder = ((byte >>> 6) & 1) === 1;
    return status;
}
function _writeStatus(status) {
    var arr = new Uint8Array(1);
    arr[0] |= status.hardcore ? 1 << 2 : 0;
    arr[0] |= status.died ? 1 << 3 : 0;
    arr[0] |= status.expansion ? 1 << 5 : 0;
    arr[0] |= status.ladder ? 1 << 6 : 0;
    return arr;
}
function _readCharMenuAppearance(bytes, constants) {
    var appearance = {};
    var reader = new bitreader_1.BitReader(bytes);
    var graphics = reader.ReadArray(16);
    var tints = reader.ReadArray(16);
    appearance.head = { graphic: graphics[0], tint: tints[0] };
    appearance.torso = { graphic: graphics[1], tint: tints[1] };
    appearance.legs = { graphic: graphics[2], tint: tints[2] };
    appearance.right_arm = { graphic: graphics[3], tint: tints[3] };
    appearance.left_arm = { graphic: graphics[4], tint: tints[4] };
    appearance.right_hand = { graphic: graphics[5], tint: tints[5] };
    appearance.left_hand = { graphic: graphics[6], tint: tints[6] };
    appearance.shield = { graphic: graphics[7], tint: tints[7] };
    appearance.special1 = { graphic: graphics[8], tint: tints[8] };
    appearance.special2 = { graphic: graphics[9], tint: tints[9] };
    appearance.special3 = { graphic: graphics[10], tint: tints[10] };
    appearance.special4 = { graphic: graphics[11], tint: tints[11] };
    appearance.special5 = { graphic: graphics[12], tint: tints[12] };
    appearance.special6 = { graphic: graphics[13], tint: tints[13] };
    appearance.special7 = { graphic: graphics[14], tint: tints[14] };
    appearance.special8 = { graphic: graphics[15], tint: tints[15] };
    return appearance;
}
function _writeCharMenuAppearance(appearance, constants) {
    var writer = new bitwriter_1.BitWriter(32);
    writer.length = 32 * 8;
    var graphics = [];
    graphics.push(appearance && appearance.head ? appearance.head.graphic : 0);
    graphics.push(appearance && appearance.torso ? appearance.torso.graphic : 0);
    graphics.push(appearance && appearance.legs ? appearance.legs.graphic : 0);
    graphics.push(appearance && appearance.right_arm ? appearance.right_arm.graphic : 0);
    graphics.push(appearance && appearance.left_arm ? appearance.left_arm.graphic : 0);
    graphics.push(appearance && appearance.right_hand ? appearance.right_hand.graphic : 0);
    graphics.push(appearance && appearance.left_hand ? appearance.left_hand.graphic : 0);
    graphics.push(appearance && appearance.shield ? appearance.shield.graphic : 0);
    graphics.push(appearance && appearance.special1 ? appearance.special1.graphic : 0);
    graphics.push(appearance && appearance.special2 ? appearance.special2.graphic : 0);
    graphics.push(appearance && appearance.special3 ? appearance.special3.graphic : 0);
    graphics.push(appearance && appearance.special4 ? appearance.special4.graphic : 0);
    graphics.push(appearance && appearance.special5 ? appearance.special5.graphic : 0);
    graphics.push(appearance && appearance.special6 ? appearance.special6.graphic : 0);
    graphics.push(appearance && appearance.special7 ? appearance.special7.graphic : 0);
    graphics.push(appearance && appearance.special8 ? appearance.special8.graphic : 0);
    for (var _i = 0, graphics_1 = graphics; _i < graphics_1.length; _i++) {
        var g = graphics_1[_i];
        writer.WriteUInt8(g);
    }
    var tints = [];
    tints.push(appearance && appearance.head ? appearance.head.tint : 0);
    tints.push(appearance && appearance.torso ? appearance.torso.tint : 0);
    tints.push(appearance && appearance.legs ? appearance.legs.tint : 0);
    tints.push(appearance && appearance.right_arm ? appearance.right_arm.tint : 0);
    tints.push(appearance && appearance.left_arm ? appearance.left_arm.tint : 0);
    tints.push(appearance && appearance.right_hand ? appearance.right_hand.tint : 0);
    tints.push(appearance && appearance.left_hand ? appearance.left_hand.tint : 0);
    tints.push(appearance && appearance.shield ? appearance.shield.tint : 0);
    tints.push(appearance && appearance.special1 ? appearance.special1.tint : 0);
    tints.push(appearance && appearance.special2 ? appearance.special2.tint : 0);
    tints.push(appearance && appearance.special3 ? appearance.special3.tint : 0);
    tints.push(appearance && appearance.special4 ? appearance.special4.tint : 0);
    tints.push(appearance && appearance.special5 ? appearance.special5.tint : 0);
    tints.push(appearance && appearance.special6 ? appearance.special6.tint : 0);
    tints.push(appearance && appearance.special7 ? appearance.special7.tint : 0);
    tints.push(appearance && appearance.special8 ? appearance.special8.tint : 0);
    for (var _a = 0, tints_1 = tints; _a < tints_1.length; _a++) {
        var t = tints_1[_a];
        writer.WriteUInt8(t);
    }
    return writer.ToArray();
}
function _readAssignedSkills(bytes, constants) {
    var skills = [];
    var reader = new bitreader_1.BitReader(bytes);
    for (var i = 0; i < 16; i++) {
        var skillId = reader.ReadUInt32();
        var skill = constants.skills[skillId];
        if (skill) {
            skills.push(skill.s);
        }
    }
    return skills;
}
function _writeAssignedSkills(skills, constants) {
    var writer = new bitwriter_1.BitWriter(64);
    writer.length = 64 * 8;
    skills = skills || [];
    for (var i = 0; i < 16; i++) {
        var skillId = _skillId(skills[i], constants);
        if (skillId > 0) {
            writer.WriteUInt32(skillId);
        }
        else {
            writer.WriteUInt32(0xffff);
        }
    }
    return writer.ToArray();
}
function _readDifficulty(bytes) {
    var difficulty = {};
    difficulty.Normal = bytes[0];
    difficulty.Nightmare = bytes[1];
    difficulty.Hell = bytes[2];
    return difficulty;
}
function _writeDifficulty(difficulty) {
    var writer = new bitwriter_1.BitWriter(3);
    writer.length = 3 * 8;
    writer.WriteUInt8(difficulty.Normal);
    writer.WriteUInt8(difficulty.Nightmare);
    writer.WriteUInt8(difficulty.Hell);
    return writer.ToArray();
}
function _readQuests(bytes) {
    var quests = {};
    var reader = new bitreader_1.BitReader(bytes);
    quests.act_i = {};
    quests.act_i.introduced = reader.ReadUInt16() === 0x1; //0x0000
    quests.act_i.den_of_evil = _readQuest(reader.ReadArray(2)); //0x0002
    quests.act_i.sisters_burial_grounds = _readQuest(reader.ReadArray(2));
    quests.act_i.tools_of_the_trade = _readQuest(reader.ReadArray(2));
    quests.act_i.the_search_for_cain = _readQuest(reader.ReadArray(2));
    quests.act_i.the_forgotten_tower = _readQuest(reader.ReadArray(2));
    quests.act_i.sisters_to_the_slaughter = _readQuest(reader.ReadArray(2));
    quests.act_i.completed = reader.ReadUInt16() === 0x1;
    quests.act_ii = {};
    quests.act_ii.introduced = reader.ReadUInt16() === 0x1; //0x0010 [if jerhyn introduction = 0x01]
    quests.act_ii.radaments_lair = _readQuest(reader.ReadArray(2)); //0x0012
    quests.act_ii.the_horadric_staff = _readQuest(reader.ReadArray(2));
    quests.act_ii.tainted_sun = _readQuest(reader.ReadArray(2));
    quests.act_ii.arcane_sanctuary = _readQuest(reader.ReadArray(2));
    quests.act_ii.the_summoner = _readQuest(reader.ReadArray(2));
    quests.act_ii.the_seven_tombs = _readQuest(reader.ReadArray(2));
    quests.act_ii.completed = reader.ReadUInt16() === 0x1; //0x001e
    quests.act_iii = {};
    quests.act_iii.introduced = reader.ReadUInt16() === 0x1; //0x0020 [if hratli introduction = 0x01]
    quests.act_iii.lam_esens_tome = _readQuest(reader.ReadArray(2)); //0x0022
    quests.act_iii.khalims_will = _readQuest(reader.ReadArray(2));
    quests.act_iii.blade_of_the_old_religion = _readQuest(reader.ReadArray(2));
    quests.act_iii.the_golden_bird = _readQuest(reader.ReadArray(2));
    quests.act_iii.the_blackened_temple = _readQuest(reader.ReadArray(2));
    quests.act_iii.the_guardian = _readQuest(reader.ReadArray(2));
    quests.act_iii.completed = reader.ReadUInt16() === 0x1; //0x002e
    quests.act_iv = {};
    quests.act_iv.introduced = reader.ReadUInt16() === 0x1; //0x0030 [if activ introduction = 0x01]
    quests.act_iv.the_fallen_angel = _readQuest(reader.ReadArray(2)); //0x0032
    quests.act_iv.terrors_end = _readQuest(reader.ReadArray(2));
    quests.act_iv.hellforge = _readQuest(reader.ReadArray(2));
    quests.act_iv.completed = reader.ReadUInt16() === 0x1; //0x0038
    reader.SkipBytes(10); //0x003a
    quests.act_v = {};
    quests.act_v.introduced = reader.ReadUInt16() === 0x1;
    quests.act_v.siege_on_harrogath = _readQuest(reader.ReadArray(2)); //0x0046
    quests.act_v.rescue_on_mount_arreat = _readQuest(reader.ReadArray(2));
    quests.act_v.prison_of_ice = _readQuest(reader.ReadArray(2));
    quests.act_v.betrayal_of_harrogath = _readQuest(reader.ReadArray(2));
    quests.act_v.rite_of_passage = _readQuest(reader.ReadArray(2));
    quests.act_v.eve_of_destruction = _readQuest(reader.ReadArray(2));
    quests.act_v.completed = reader.ReadUInt16() === 0x1;
    reader.SkipBytes(12);
    return quests; //sizeof [0x0060]
}
function _writeQuests(quests) {
    var writer = new bitwriter_1.BitWriter(96);
    writer.length = 96 * 8;
    var difficultyCompleted = +quests.act_v.completed || +quests.act_v.eve_of_destruction.is_completed;
    return writer
        .WriteUInt16(+quests.act_i.introduced)
        .WriteArray(_writeQuest(quests.act_i.den_of_evil))
        .WriteArray(_writeQuest(quests.act_i.sisters_burial_grounds))
        .WriteArray(_writeQuest(quests.act_i.tools_of_the_trade))
        .WriteArray(_writeQuest(quests.act_i.the_search_for_cain))
        .WriteArray(_writeQuest(quests.act_i.the_forgotten_tower))
        .WriteArray(_writeQuest(quests.act_i.sisters_to_the_slaughter))
        .WriteUInt16(+quests.act_i.completed || +quests.act_i.sisters_to_the_slaughter.is_completed)
        .WriteUInt16(+quests.act_ii.introduced || +quests.act_i.sisters_to_the_slaughter.is_completed)
        .WriteArray(_writeQuest(quests.act_ii.radaments_lair))
        .WriteArray(_writeQuest(quests.act_ii.the_horadric_staff))
        .WriteArray(_writeQuest(quests.act_ii.tainted_sun))
        .WriteArray(_writeQuest(quests.act_ii.arcane_sanctuary))
        .WriteArray(_writeQuest(quests.act_ii.the_summoner))
        .WriteArray(_writeQuest(quests.act_ii.the_seven_tombs))
        .WriteUInt16(+quests.act_ii.completed || +quests.act_ii.the_seven_tombs.is_completed)
        .WriteUInt16(+quests.act_iii.introduced || +quests.act_ii.the_seven_tombs.is_completed)
        .WriteArray(_writeQuest(quests.act_iii.lam_esens_tome))
        .WriteArray(_writeQuest(quests.act_iii.khalims_will))
        .WriteArray(_writeQuest(quests.act_iii.blade_of_the_old_religion))
        .WriteArray(_writeQuest(quests.act_iii.the_golden_bird))
        .WriteArray(_writeQuest(quests.act_iii.the_blackened_temple))
        .WriteArray(_writeQuest(quests.act_iii.the_guardian))
        .WriteUInt16(+quests.act_iii.completed || +quests.act_iii.the_guardian.is_completed)
        .WriteUInt16(+quests.act_iv.introduced || +quests.act_iii.the_guardian.is_completed)
        .WriteArray(_writeQuest(quests.act_iv.the_fallen_angel))
        .WriteArray(_writeQuest(quests.act_iv.terrors_end))
        .WriteArray(_writeQuest(quests.act_iv.hellforge))
        .WriteUInt16(+quests.act_iv.completed || +quests.act_iv.terrors_end.is_completed)
        .WriteArray(new Uint8Array(6))
        .WriteUInt16(+quests.act_v.introduced || +quests.act_iv.terrors_end.is_completed)
        .WriteArray(new Uint8Array(4))
        .WriteArray(_writeQuest(quests.act_v.siege_on_harrogath))
        .WriteArray(_writeQuest(quests.act_v.rescue_on_mount_arreat))
        .WriteArray(_writeQuest(quests.act_v.prison_of_ice))
        .WriteArray(_writeQuest(quests.act_v.betrayal_of_harrogath))
        .WriteArray(_writeQuest(quests.act_v.rite_of_passage))
        .WriteArray(_writeQuest(quests.act_v.eve_of_destruction))
        .WriteUInt8(difficultyCompleted)
        .WriteUInt8(difficultyCompleted ? 0x80 : 0x0) //is this right?
        .WriteArray(new Uint8Array(12))
        .ToArray();
}
function _readQuest(bytes) {
    var quest = {};
    var reader = new bitreader_1.BitReader(bytes);
    quest.is_completed = reader.ReadBit() === 1;
    quest.is_requirement_completed = reader.ReadBit() === 1;
    quest.is_received = reader.ReadBit() === 1;
    if (reader.ReadBit() === 1)
        quest.unk3 = true;
    if (reader.ReadBit() === 1)
        quest.unk4 = true;
    if (reader.ReadBit() === 1)
        quest.unk5 = true;
    if (reader.ReadBit() === 1)
        quest.unk6 = true;
    if (reader.ReadBit() === 1)
        quest.consumed_scroll = true;
    if (reader.ReadBit() === 1)
        quest.unk8 = true;
    if (reader.ReadBit() === 1)
        quest.unk9 = true;
    if (reader.ReadBit() === 1)
        quest.unk10 = true;
    if (reader.ReadBit() === 1)
        quest.unk11 = true;
    quest.closed = reader.ReadBit() === 1;
    quest.done_recently = reader.ReadBit() === 1;
    if (reader.ReadBit() === 1)
        quest.unk14 = true;
    if (reader.ReadBit() === 1)
        quest.unk15 = true;
    return quest;
}
function _writeQuest(quest) {
    var writer = new bitwriter_1.BitWriter(2);
    writer.length = 2 * 8;
    writer.WriteBit(+quest.is_completed);
    writer.WriteBit(+quest.is_requirement_completed);
    writer.WriteBit(+quest.is_received);
    writer.WriteBit(+quest.unk3);
    writer.WriteBit(+quest.unk4);
    writer.WriteBit(+quest.unk5);
    writer.WriteBit(+quest.unk6);
    writer.WriteBit(+quest.consumed_scroll);
    writer.WriteBit(+quest.unk8);
    writer.WriteBit(+quest.unk9);
    writer.WriteBit(+quest.unk10);
    writer.WriteBit(+quest.unk11);
    writer.WriteBit(+quest.closed);
    writer.WriteBit(+quest.done_recently);
    writer.WriteBit(+quest.unk14);
    writer.WriteBit(+quest.unk15);
    return writer.ToArray();
}
function _readWaypointData(bytes) {
    var waypoints = {};
    var reader = new bitreader_1.BitReader(bytes);
    for (var i = 0; i < difficulties.length; i++) {
        waypoints[difficulties[i]] = _readWaypoints(reader.ReadArray(24));
    }
    return waypoints;
}
function _readWaypoints(bytes) {
    var waypoints = {};
    var reader = new bitreader_1.BitReader(bytes);
    reader.SkipBytes(2); //unk = 0x2, 0x
    waypoints.act_i = {};
    waypoints.act_i.rogue_encampement = reader.ReadBit() === 1;
    waypoints.act_i.cold_plains = reader.ReadBit() === 1;
    waypoints.act_i.stony_field = reader.ReadBit() === 1;
    waypoints.act_i.dark_woods = reader.ReadBit() === 1;
    waypoints.act_i.black_marsh = reader.ReadBit() === 1;
    waypoints.act_i.outer_cloister = reader.ReadBit() === 1;
    waypoints.act_i.jail_lvl_1 = reader.ReadBit() === 1;
    waypoints.act_i.inner_cloister = reader.ReadBit() === 1;
    waypoints.act_i.catacombs_lvl_2 = reader.ReadBit() === 1;
    waypoints.act_ii = {};
    waypoints.act_ii.lut_gholein = reader.ReadBit() === 1;
    waypoints.act_ii.sewers_lvl_2 = reader.ReadBit() === 1;
    waypoints.act_ii.dry_hills = reader.ReadBit() === 1;
    waypoints.act_ii.halls_of_the_dead_lvl_2 = reader.ReadBit() === 1;
    waypoints.act_ii.far_oasis = reader.ReadBit() === 1;
    waypoints.act_ii.lost_city = reader.ReadBit() === 1;
    waypoints.act_ii.palace_cellar_lvl_1 = reader.ReadBit() === 1;
    waypoints.act_ii.arcane_sanctuary = reader.ReadBit() === 1;
    waypoints.act_ii.canyon_of_the_magi = reader.ReadBit() === 1;
    waypoints.act_iii = {};
    waypoints.act_iii.kurast_docks = reader.ReadBit() === 1;
    waypoints.act_iii.spider_forest = reader.ReadBit() === 1;
    waypoints.act_iii.great_marsh = reader.ReadBit() === 1;
    waypoints.act_iii.flayer_jungle = reader.ReadBit() === 1;
    waypoints.act_iii.lower_kurast = reader.ReadBit() === 1;
    waypoints.act_iii.kurast_bazaar = reader.ReadBit() === 1;
    waypoints.act_iii.upper_kurast = reader.ReadBit() === 1;
    waypoints.act_iii.travincal = reader.ReadBit() === 1;
    waypoints.act_iii.durance_of_hate_lvl_2 = reader.ReadBit() === 1;
    waypoints.act_iv = {};
    waypoints.act_iv.the_pandemonium_fortress = reader.ReadBit() === 1;
    waypoints.act_iv.city_of_the_damned = reader.ReadBit() === 1;
    waypoints.act_iv.river_of_flame = reader.ReadBit() === 1;
    waypoints.act_v = {};
    waypoints.act_v.harrogath = reader.ReadBit() === 1;
    waypoints.act_v.frigid_highlands = reader.ReadBit() === 1;
    waypoints.act_v.arreat_plateau = reader.ReadBit() === 1;
    waypoints.act_v.crystalline_passage = reader.ReadBit() === 1;
    waypoints.act_v.halls_of_pain = reader.ReadBit() === 1;
    waypoints.act_v.glacial_trail = reader.ReadBit() === 1;
    waypoints.act_v.frozen_tundra = reader.ReadBit() === 1;
    waypoints.act_v.the_ancients_way = reader.ReadBit() === 1;
    waypoints.act_v.worldstone_keep_lvl_2 = reader.ReadBit() === 1;
    reader.Align().SkipBytes(17);
    return waypoints;
}
function _writeWaypointData(waypoints) {
    var writer = new bitwriter_1.BitWriter(72);
    writer.length = 72 * 8;
    for (var i = 0; i < difficulties.length; i++) {
        var w = waypoints != null ? waypoints[difficulties[i]] : null;
        writer.WriteArray(_writeWaypoints(w));
    }
    return writer.ToArray();
}
function _writeWaypoints(waypoints) {
    var writer = new bitwriter_1.BitWriter(24);
    writer.length = 24 * 8;
    writer.WriteArray(new Uint8Array([0x02, 0x01]));
    if (waypoints) {
        if (waypoints.act_i) {
            writer.WriteBit(+waypoints.act_i.rogue_encampement);
            writer.WriteBit(+waypoints.act_i.cold_plains);
            writer.WriteBit(+waypoints.act_i.stony_field);
            writer.WriteBit(+waypoints.act_i.dark_woods);
            writer.WriteBit(+waypoints.act_i.black_marsh);
            writer.WriteBit(+waypoints.act_i.outer_cloister);
            writer.WriteBit(+waypoints.act_i.jail_lvl_1);
            writer.WriteBit(+waypoints.act_i.inner_cloister);
            writer.WriteBit(+waypoints.act_i.catacombs_lvl_2);
        }
        if (waypoints.act_ii) {
            writer.WriteBit(+waypoints.act_ii.lut_gholein);
            writer.WriteBit(+waypoints.act_ii.sewers_lvl_2);
            writer.WriteBit(+waypoints.act_ii.dry_hills);
            writer.WriteBit(+waypoints.act_ii.halls_of_the_dead_lvl_2);
            writer.WriteBit(+waypoints.act_ii.far_oasis);
            writer.WriteBit(+waypoints.act_ii.lost_city);
            writer.WriteBit(+waypoints.act_ii.palace_cellar_lvl_1);
            writer.WriteBit(+waypoints.act_ii.arcane_sanctuary);
            writer.WriteBit(+waypoints.act_ii.canyon_of_the_magi);
        }
        if (waypoints.act_iii) {
            writer.WriteBit(+waypoints.act_iii.kurast_docks);
            writer.WriteBit(+waypoints.act_iii.spider_forest);
            writer.WriteBit(+waypoints.act_iii.great_marsh);
            writer.WriteBit(+waypoints.act_iii.flayer_jungle);
            writer.WriteBit(+waypoints.act_iii.lower_kurast);
            writer.WriteBit(+waypoints.act_iii.kurast_bazaar);
            writer.WriteBit(+waypoints.act_iii.upper_kurast);
            writer.WriteBit(+waypoints.act_iii.travincal);
            writer.WriteBit(+waypoints.act_iii.durance_of_hate_lvl_2);
        }
        if (waypoints.act_iv) {
            writer.WriteBit(+waypoints.act_iv.the_pandemonium_fortress);
            writer.WriteBit(+waypoints.act_iv.city_of_the_damned);
            writer.WriteBit(+waypoints.act_iv.river_of_flame);
        }
        if (waypoints.act_v) {
            writer.WriteBit(+waypoints.act_v.harrogath);
            writer.WriteBit(+waypoints.act_v.frigid_highlands);
            writer.WriteBit(+waypoints.act_v.arreat_plateau);
            writer.WriteBit(+waypoints.act_v.crystalline_passage);
            writer.WriteBit(+waypoints.act_v.halls_of_pain);
            writer.WriteBit(+waypoints.act_v.glacial_trail);
            writer.WriteBit(+waypoints.act_v.frozen_tundra);
            writer.WriteBit(+waypoints.act_v.the_ancients_way);
            writer.WriteBit(+waypoints.act_v.worldstone_keep_lvl_2);
        }
    }
    else {
        //all wps
        //writer.WriteArray(new Uint8Array(5));
        writer.WriteArray(new Uint8Array([0xff, 0xff, 0xff, 0xff, 0x7f]));
        //_writeBits(writer, 0x3fffffffff, start, 0, 38);
    }
    writer.Align().WriteArray(new Uint8Array(17));
    return writer.ToArray();
}
function _readNPCData(bytes) {
    var npcs = { normal: {}, nm: {}, hell: {} };
    var reader = new bitreader_1.BitReader(bytes);
    for (var j = 0; j < 3; j++) {
        npcs[difficulties[j]] = {
            warriv_act_ii: { intro: false, congrats: false },
            charsi: { intro: false, congrats: false },
            warriv_act_i: { intro: false, congrats: false },
            kashya: { intro: false, congrats: false },
            akara: { intro: false, congrats: false },
            gheed: { intro: false, congrats: false },
            greiz: { intro: false, congrats: false },
            jerhyn: { intro: false, congrats: false },
            meshif_act_ii: { intro: false, congrats: false },
            geglash: { intro: false, congrats: false },
            lysnader: { intro: false, congrats: false },
            fara: { intro: false, congrats: false },
            drogan: { intro: false, congrats: false },
            alkor: { intro: false, congrats: false },
            hratli: { intro: false, congrats: false },
            ashera: { intro: false, congrats: false },
            cain_act_iii: { intro: false, congrats: false },
            elzix: { intro: false, congrats: false },
            malah: { intro: false, congrats: false },
            anya: { intro: false, congrats: false },
            natalya: { intro: false, congrats: false },
            meshif_act_iii: { intro: false, congrats: false },
            ormus: { intro: false, congrats: false },
            cain_act_v: { intro: false, congrats: false },
            qualkehk: { intro: false, congrats: false },
            nihlathak: { intro: false, congrats: false },
        };
    }
    //introductions
    for (var i = 0; i < 3; i++) {
        var j = i * 5;
        var npc = npcs[difficulties[i]];
        npc.warriv_act_ii.intro = reader.bits[0 + j * 8] === 1;
        npc.charsi.intro = reader.bits[2 + j * 8] === 1;
        npc.warriv_act_i.intro = reader.bits[3 + j * 8] === 1;
        npc.kashya.intro = reader.bits[4 + j * 8] === 1;
        npc.akara.intro = reader.bits[5 + j * 8] === 1;
        npc.gheed.intro = reader.bits[6 + j * 8] === 1;
        npc.greiz.intro = reader.bits[8 + j * 8] === 1;
        npc.jerhyn.intro = reader.bits[9 + j * 8] === 1;
        npc.meshif_act_ii.intro = reader.bits[10 + j * 8] === 1;
        npc.geglash.intro = reader.bits[11 + j * 8] === 1;
        npc.lysnader.intro = reader.bits[12 + j * 8] === 1;
        npc.fara.intro = reader.bits[13 + j * 8] === 1;
        npc.drogan.intro = reader.bits[14 + j * 8] === 1;
        npc.alkor.intro = reader.bits[16 + j * 8] === 1;
        npc.hratli.intro = reader.bits[17 + j * 8] === 1;
        npc.ashera.intro = reader.bits[18 + j * 8] === 1;
        npc.cain_act_iii.intro = reader.bits[21 + j * 8] === 1;
        npc.elzix.intro = reader.bits[23 + j * 8] === 1;
        npc.malah.intro = reader.bits[24 + j * 8] === 1;
        npc.anya.intro = reader.bits[25 + j * 8] === 1;
        npc.natalya.intro = reader.bits[27 + j * 8] === 1;
        npc.meshif_act_iii.intro = reader.bits[28 + j * 8] === 1;
        npc.ormus.intro = reader.bits[31 + j * 8] === 1;
        npc.cain_act_v.intro = reader.bits[37 + j * 8] === 1;
        npc.qualkehk.intro = reader.bits[38 + j * 8] === 1;
        npc.nihlathak.intro = reader.bits[39 + j * 8] === 1;
    }
    //congrats
    for (var i = 0; i < 3; i++) {
        var j = i * 5;
        var npc = npcs[difficulties[i]];
        npc.warriv_act_ii.congrats = reader.bits[192 + (0 + j * 8)] === 1;
        npc.charsi.congrats = reader.bits[192 + (2 + j * 8)] === 1;
        npc.warriv_act_i.congrats = reader.bits[192 + (3 + j * 8)] === 1;
        npc.kashya.congrats = reader.bits[192 + (4 + j * 8)] === 1;
        npc.akara.congrats = reader.bits[192 + (5 + j * 8)] === 1;
        npc.gheed.congrats = reader.bits[192 + (6 + j * 8)] === 1;
        npc.greiz.congrats = reader.bits[192 + (8 + j * 8)] === 1;
        npc.jerhyn.congrats = reader.bits[192 + (9 + j * 8)] === 1;
        npc.meshif_act_ii.congrats = reader.bits[192 + (10 + j * 8)] === 1;
        npc.geglash.congrats = reader.bits[192 + (11 + j * 8)] === 1;
        npc.lysnader.congrats = reader.bits[192 + (12 + j * 8)] === 1;
        npc.fara.congrats = reader.bits[192 + (13 + j * 8)] === 1;
        npc.drogan.congrats = reader.bits[192 + (14 + j * 8)] === 1;
        npc.alkor.congrats = reader.bits[192 + (16 + j * 8)] === 1;
        npc.hratli.congrats = reader.bits[192 + (17 + j * 8)] === 1;
        npc.ashera.congrats = reader.bits[192 + (18 + j * 8)] === 1;
        npc.cain_act_iii.congrats = reader.bits[192 + (21 + j * 8)] === 1;
        npc.elzix.congrats = reader.bits[192 + (23 + j * 8)] === 1;
        npc.malah.congrats = reader.bits[192 + (24 + j * 8)] === 1;
        npc.anya.congrats = reader.bits[192 + (25 + j * 8)] === 1;
        npc.natalya.congrats = reader.bits[192 + (27 + j * 8)] === 1;
        npc.meshif_act_iii.congrats = reader.bits[192 + (28 + j * 8)] === 1;
        npc.ormus.congrats = reader.bits[192 + (31 + j * 8)] === 1;
        npc.cain_act_v.congrats = reader.bits[192 + (37 + j * 8)] === 1;
        npc.qualkehk.congrats = reader.bits[192 + (38 + j * 8)] === 1;
        npc.nihlathak.congrats = reader.bits[192 + (39 + j * 8)] === 1;
    }
    return npcs;
}
function _writeNPCData(npcs) {
    var writer = new bitwriter_1.BitWriter(0x30);
    writer.length = 0x30 * 8;
    if (npcs) {
        for (var j = 0; j < 3; j++) {
            var npc = npcs[difficulties[j]];
            writer.SeekByte(j * 5);
            writer.WriteBit(+npc.warriv_act_ii.intro);
            writer.WriteBit(0);
            writer.WriteBit(+npc.charsi.intro);
            writer.WriteBit(+npc.warriv_act_i.intro);
            writer.WriteBit(+npc.kashya.intro);
            writer.WriteBit(+npc.akara.intro);
            writer.WriteBit(+npc.gheed.intro);
            writer.WriteBit(0);
            writer.WriteBit(+npc.greiz.intro);
            writer.WriteBit(+npc.jerhyn.intro);
            writer.WriteBit(+npc.meshif_act_ii.intro);
            writer.WriteBit(+npc.geglash.intro);
            writer.WriteBit(+npc.lysnader.intro);
            writer.WriteBit(+npc.fara.intro);
            writer.WriteBit(+npc.drogan.intro);
            writer.WriteBit(0);
            writer.WriteBit(+npc.alkor.intro);
            writer.WriteBit(+npc.hratli.intro);
            writer.WriteBit(+npc.ashera.intro);
            writer.WriteBits(new Uint8Array(2).fill(0), 2);
            writer.WriteBit(+npc.cain_act_iii.intro);
            writer.WriteBit(0);
            writer.WriteBit(+npc.elzix.intro);
            writer.WriteBit(+npc.malah.intro);
            writer.WriteBit(+npc.anya.intro);
            writer.WriteBit(0);
            writer.WriteBit(+npc.natalya.intro);
            writer.WriteBit(+npc.meshif_act_iii.intro);
            writer.WriteBits(new Uint8Array(2).fill(0), 2);
            writer.WriteBit(+npc.ormus.intro);
            writer.WriteBits(new Uint8Array(5).fill(0), 5);
            writer.WriteBit(+npc.cain_act_v.intro);
            writer.WriteBit(+npc.qualkehk.intro);
            writer.WriteBit(+npc.nihlathak.intro);
        }
        for (var j = 0; j < 3; j++) {
            writer.SeekByte(24 + j * 5);
            var npc = npcs[difficulties[j]];
            writer.WriteBit(+npc.warriv_act_ii.congrats);
            writer.WriteBit(0);
            writer.WriteBit(+npc.charsi.congrats);
            writer.WriteBit(+npc.warriv_act_i.congrats);
            writer.WriteBit(+npc.kashya.congrats);
            writer.WriteBit(+npc.akara.congrats);
            writer.WriteBit(+npc.gheed.congrats);
            writer.WriteBit(0);
            writer.WriteBit(+npc.greiz.congrats);
            writer.WriteBit(+npc.jerhyn.congrats);
            writer.WriteBit(+npc.meshif_act_ii.congrats);
            writer.WriteBit(+npc.geglash.congrats);
            writer.WriteBit(+npc.lysnader.congrats);
            writer.WriteBit(+npc.fara.congrats);
            writer.WriteBit(+npc.drogan.congrats);
            writer.WriteBit(0);
            writer.WriteBit(+npc.alkor.congrats);
            writer.WriteBit(+npc.hratli.congrats);
            writer.WriteBit(+npc.ashera.congrats);
            writer.WriteBits(new Uint8Array(2).fill(0), 2);
            writer.WriteBit(+npc.cain_act_iii.congrats);
            writer.WriteBit(0);
            writer.WriteBit(+npc.elzix.congrats);
            writer.WriteBit(+npc.malah.congrats);
            writer.WriteBit(+npc.anya.congrats);
            writer.WriteBit(0);
            writer.WriteBit(+npc.natalya.congrats);
            writer.WriteBit(+npc.meshif_act_iii.congrats);
            writer.WriteBits(new Uint8Array(2).fill(0), 2);
            writer.WriteBit(+npc.ormus.congrats);
            writer.WriteBits(new Uint8Array(5).fill(0), 5);
            writer.WriteBit(+npc.cain_act_v.congrats);
            writer.WriteBit(+npc.qualkehk.congrats);
            writer.WriteBit(+npc.nihlathak.congrats);
        }
    }
    return writer.ToArray();
}


/***/ }),

/***/ "./src/data/ItemStatGroups.json":
/*!**************************************!*\
  !*** ./src/data/ItemStatGroups.json ***!
  \**************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, default */
/***/ (function(module) {

module.exports = JSON.parse("[{\"s\":\"group:all-attr\",\"statsInGroup\":[0,1,2,3],\"allEqual\":true,\"dP\":\"to all Attributes\",\"dN\":\"to all Attributes\",\"dF\":1,\"dV\":1,\"so\":67},{\"s\":\"group:all-res\",\"statsInGroup\":[39,41,43,45],\"allEqual\":true,\"dP\":\"All Resistances +%d\",\"dN\":\"All Resistances +%d\",\"dF\":19,\"so\":40},{\"s\":\"group:enhanced-dmg\",\"statsInGroup\":[17,18],\"allEqual\":true,\"dP\":\"Enhanced damage\",\"dN\":\"Enhanced damage\",\"dF\":4,\"dV\":1,\"so\":130},{\"s\":\"group:primary-dmg\",\"statsInGroup\":[21,22],\"isRange\":true,\"dP\":\"+%d damage\",\"dN\":\"Adds %d-%d damage\",\"dF\":100,\"so\":127},{\"s\":\"group:secondary-dmg\",\"statsInGroup\":[23,24],\"isRange\":true,\"dP\":\"+%d damage\",\"dN\":\"Adds %d-%d damage\",\"dF\":100,\"so\":124},{\"s\":\"group:fire-dmg\",\"statsInGroup\":[48,49],\"isRange\":true,\"dP\":\"+%d fire damage\",\"dN\":\"Adds %d-%d fire damage\",\"dF\":100,\"so\":102},{\"s\":\"group:light-dmg\",\"statsInGroup\":[50,51],\"isRange\":true,\"dP\":\"+%d lightning damage\",\"dN\":\"Adds %d-%d lightning damage\",\"dF\":100,\"so\":99},{\"s\":\"group:magic-dmg\",\"statsInGroup\":[52,53],\"isRange\":true,\"dP\":\"+%d magic damage\",\"dN\":\"Adds %d-%d magic damage\",\"dF\":100,\"so\":104},{\"s\":\"group:cold-dmg\",\"statsInGroup\":[54,55,56],\"isRange\":true,\"dP\":\"+%d cold damage\",\"dN\":\"Adds %d-%d cold damage\",\"dF\":100,\"so\":96},{\"s\":\"group:poison-dmg\",\"statsInGroup\":[57,58,59],\"isRange\":true,\"dP\":\"+%d poison damage over %d seconds\",\"dN\":\"Adds %d-%d poison damage over %d seconds\",\"dF\":101,\"so\":92},{\"s\":\"group:min-dmg\",\"statsInGroup\":[21,23],\"allEqual\":true,\"dP\":\"to Minimum Damage\",\"dN\":\"to Minimum Damage\",\"dF\":1,\"dV\":1,\"so\":127},{\"s\":\"group:max-dmg\",\"statsInGroup\":[22,24],\"allEqual\":true,\"dP\":\"to Maximum Damage\",\"dN\":\"to Maximum Damage\",\"dF\":1,\"dV\":1,\"so\":126}]");

/***/ }),

/***/ "./src/data/SkillTabs.json":
/*!*********************************!*\
  !*** ./src/data/SkillTabs.json ***!
  \*********************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, default */
/***/ (function(module) {

module.exports = JSON.parse("[{\"id\":0,\"name\":\"Bow and Crossbow Skills\",\"charClass\":0},{\"id\":1,\"name\":\"Passive and Magic Skills\",\"charClass\":0},{\"id\":2,\"name\":\"Javelin and Spear Skills\",\"charClass\":0},{\"id\":8,\"name\":\"Fire Skills\",\"charClass\":1},{\"id\":9,\"name\":\"Lightning Skills\",\"charClass\":1},{\"id\":10,\"name\":\"Cold Skills\",\"charClass\":1},{\"id\":16,\"name\":\"Curses Skills\",\"charClass\":2},{\"id\":17,\"name\":\"Poison and Bone Skills\",\"charClass\":2},{\"id\":18,\"name\":\"Necromancer Summoning Skills\",\"charClass\":2},{\"id\":24,\"name\":\"Paladin Combat Skills\",\"charClass\":3},{\"id\":25,\"name\":\"Offensive Auras Skills\",\"charClass\":3},{\"id\":26,\"name\":\"Defensive Auras Skills\",\"charClass\":3},{\"id\":32,\"name\":\"Barbarian Combat Skills\",\"charClass\":4},{\"id\":33,\"name\":\"Masteries Skills\",\"charClass\":4},{\"id\":34,\"name\":\"Warcries Skills\",\"charClass\":4},{\"id\":40,\"name\":\"Druid Summoning Skills\",\"charClass\":5},{\"id\":41,\"name\":\"Shape Shifting Skills\",\"charClass\":5},{\"id\":42,\"name\":\"Elemental Skills\",\"charClass\":5},{\"id\":48,\"name\":\"Traps Skills\",\"charClass\":6},{\"id\":49,\"name\":\"Shadow Disciplines Skills\",\"charClass\":6},{\"id\":50,\"name\":\"Martial Arts Skills\",\"charClass\":6}]");

/***/ }),

/***/ "./src/data/parser.ts":
/*!****************************!*\
  !*** ./src/data/parser.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readConstantData = void 0;
var types = __importStar(__webpack_require__(/*! ../d2/types */ "./src/d2/types.ts"));
//special stats. read the next N properties.
//seems to be hardcode in d2 and not in itemstatcost
var item_property_stat_count = {
    item_maxdamage_percent: { numprops: 2, rangestr: "strModMinDamageRange", equalstr: "strModEnhancedDamage" },
    firemindam: { numprops: 2, rangestr: "strModFireDamageRange", equalstr: "strModFireDamage" },
    lightmindam: { numprops: 2, rangestr: "strModLightningDamageRange", equalstr: "strModLightningDamage" },
    magicmindam: { numprops: 2, rangestr: "strModMagicDamageRange", equalstr: "strModMagicDamage" },
    coldmindam: { numprops: 3, rangestr: "strModColdDamageRange", equalstr: "strModColdDamage" },
    poisonmindam: { numprops: 3, rangestr: "strModPoisonDamageRange", equalstr: "strModPoisonDamage" },
};
//TODO use smaller field names to minimize size of file.
function readConstantData(buffers) {
    var constants = {};
    var strings = {};
    if (_hasKey(buffers, "strings.txt")) {
        strings = _readStrings(_getKey(buffers, "string.txt"));
        strings = Object.assign(strings, _readStrings(_getKey(buffers, "expansionstring.txt")));
        strings = Object.assign(strings, _readStrings(_getKey(buffers, "patchstring.txt")));
    }
    else {
        strings = _readJSONStrings(_getKey(buffers, "item-gems.json"));
        strings = Object.assign(strings, _readJSONStrings(_getKey(buffers, "item-modifiers.json")));
        strings = Object.assign(strings, _readJSONStrings(_getKey(buffers, "item-nameaffixes.json")));
        strings = Object.assign(strings, _readJSONStrings(_getKey(buffers, "item-names.json")));
        strings = Object.assign(strings, _readJSONStrings(_getKey(buffers, "item-runes.json")));
        strings = Object.assign(strings, _readJSONStrings(_getKey(buffers, "skills.json")));
    }
    constants.classes = _readClasses(_getArray(buffers, "CharStats.txt"), _getArray(buffers, "PlayerClass.txt"), strings);
    var skillDescs = _readSkillDesc(_getArray(buffers, "SkillDesc.txt"), strings);
    constants.skills = _readSkills(_getArray(buffers, "skills.txt"), skillDescs, strings);
    constants.rare_names = [null].concat(_readRareNames(_getArray(buffers, "RareSuffix.txt"), 1, strings));
    constants.rare_names = constants.rare_names.concat(_readRareNames(_getArray(buffers, "RarePrefix.txt"), constants.rare_names.length, strings));
    constants.magic_prefixes = _readMagicNames(_getArray(buffers, "MagicPrefix.txt"), strings);
    constants.magic_suffixes = _readMagicNames(_getArray(buffers, "MagicSuffix.txt"), strings);
    constants.properties = _readProperties(_getArray(buffers, "Properties.txt"), strings);
    constants.magical_properties = _readItemStatCosts(_getArray(buffers, "ItemStatCost.txt"), strings);
    constants.runewords = _readRunewords(_getArray(buffers, "Runes.txt"), strings, constants.skills);
    constants.set_items = _readSetOrUnqItems(_getArray(buffers, "SetItems.txt"), strings, constants.skills);
    constants.unq_items = _readSetOrUnqItems(_getArray(buffers, "UniqueItems.txt"), strings, constants.skills);
    var item_types = _readTypes(_getArray(buffers, "ItemTypes.txt"), strings);
    var armor_items = _readItems(_getArray(buffers, "Armor.txt"), item_types, strings);
    var weapon_items = _readItems(_getArray(buffers, "Weapons.txt"), item_types, strings);
    var other_items = _readItems(_getArray(buffers, "Misc.txt"), item_types, strings);
    constants.stackables = {};
    __spreadArrays(armor_items, weapon_items, other_items).filter(function (item) { return item.s === 1; })
        .map(function (item) { return (constants.stackables[item.code] = { n: item.n }); });
    constants.armor_items = {};
    armor_items.map(function (item) {
        constants.armor_items[item.code] = item;
        delete item.code;
    });
    constants.weapon_items = {};
    weapon_items.map(function (item) {
        constants.weapon_items[item.code] = item;
        delete item.code;
    });
    constants.other_items = {};
    other_items.map(function (item) {
        constants.other_items[item.code] = item;
        delete item.code;
    });
    _readGems(constants.other_items, _getArray(buffers, "Gems.txt"), strings);
    return constants;
}
exports.readConstantData = readConstantData;
function _getArray(files, find) {
    return _readTsv(_getKey(files, find));
}
function _getKey(files, find) {
    var key = Object.keys(files).find(function (key) { return key.toLowerCase() === find.toLowerCase(); });
    if (!key) {
        throw new Error("Cannot find file: " + find);
    }
    return files[key];
}
function _hasKey(files, find) {
    return Object.keys(files).find(function (key) { return key.toLowerCase() === find.toLowerCase(); }) != null;
}
function _readTsv(file) {
    var lines = file.split(/\r?\n/).map(function (line) { return line.split(/\t/); });
    var header = lines[0];
    return {
        header: header,
        lines: lines,
    };
}
function _readStrings(file) {
    var result = {};
    file
        .split(/\r?\n/)
        .map(function (line) { return line.split(/\t/); })
        .map(function (line) {
        if (!result[line[0]]) {
            result[line[0]] = line[1];
        }
    });
    return result;
}
function _readJSONStrings(file) {
    var result = {};
    //remove BOM
    if (file.charCodeAt(0) === 0xfeff) {
        file = file.slice(1);
    }
    var data = JSON.parse(file);
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var str = data_1[_i];
        result[str.Key] = str.enUS;
    }
    return result;
}
function _readClasses(tsv, tsv2, strings) {
    var arr = [];
    var cClass = tsv.header.indexOf("class");
    // str	dex	int	vit	tot	stamina
    var cStr = tsv.header.indexOf("str");
    var cDex = tsv.header.indexOf("dex");
    var cInt = tsv.header.indexOf("int");
    var cVit = tsv.header.indexOf("vit");
    var cStam = tsv.header.indexOf("stamina");
    var cHpadd = tsv.header.indexOf("hpadd");
    var cLifePerLvl = tsv.header.indexOf("LifePerLevel");
    var cStamPerLvl = tsv.header.indexOf("StaminaPerLevel");
    var cManaPerLvl = tsv.header.indexOf("ManaPerLevel");
    var cLifePerVit = tsv.header.indexOf("LifePerVitality");
    var cStamPerVit = tsv.header.indexOf("StaminaPerVitality");
    var cManaPerMag = tsv.header.indexOf("ManaPerMagic");
    var cAllSkills = tsv.header.indexOf("StrAllSkills");
    var cSkillTab1 = tsv.header.indexOf("StrSkillTab1");
    var cSkillTab2 = tsv.header.indexOf("StrSkillTab2");
    var cSkillTab3 = tsv.header.indexOf("StrSkillTab3");
    var cClassOnly = tsv.header.indexOf("StrClassOnly");
    var cCode = tsv2.header.indexOf("Code");
    var id = 0;
    for (var i = 1; i < tsv.lines.length; i++) {
        var clazz = tsv.lines[i][cClass];
        if (clazz && clazz != "Expansion") {
            arr[id] = {
                id: id,
                n: clazz,
                c: tsv2.lines[i][cCode],
                as: strings[tsv.lines[i][cAllSkills]],
                ts: [strings[tsv.lines[i][cSkillTab1]], strings[tsv.lines[i][cSkillTab2]], strings[tsv.lines[i][cSkillTab3]]],
                co: strings[tsv.lines[i][cClassOnly]],
                s: {
                    lpl: +tsv.lines[i][cLifePerLvl],
                    mpl: +tsv.lines[i][cManaPerLvl],
                    spl: +tsv.lines[i][cStamPerLvl],
                    lpv: +tsv.lines[i][cLifePerVit],
                    spv: +tsv.lines[i][cStamPerVit],
                    mpe: +tsv.lines[i][cManaPerMag],
                },
                a: {
                    str: +tsv.lines[i][cStr],
                    dex: +tsv.lines[i][cDex],
                    int: +tsv.lines[i][cInt],
                    vit: +tsv.lines[i][cVit],
                    stam: +tsv.lines[i][cStam],
                    hpadd: tsv.lines[i][cHpadd],
                },
            };
            id++;
        }
    }
    return arr;
}
function _readSkillDesc(tsv, strings) {
    var arr = {};
    var cSkillDesc = tsv.header.indexOf("skilldesc");
    var cStrName = tsv.header.indexOf("str name");
    for (var i = 1; i < tsv.lines.length; i++) {
        var id = tsv.lines[i][cSkillDesc];
        var skillStrName = tsv.lines[i][cStrName];
        if (id && skillStrName) {
            arr[id] = strings[skillStrName];
        }
    }
    return arr;
}
function _readSkills(tsv, skillDescs, strings) {
    var arr = [];
    var cSkill = tsv.header.indexOf("skill");
    var cSkillDesc = tsv.header.indexOf("skilldesc");
    var cId = tsv.header.indexOf("Id");
    if (cId < 0) {
        cId = tsv.header.indexOf("*Id");
    }
    var cCharclass = tsv.header.indexOf("charclass");
    for (var i = 1; i < tsv.lines.length; i++) {
        var id = +tsv.lines[i][cId];
        var skillDesc = tsv.lines[i][cSkillDesc];
        if (skillDesc) {
            var o = {};
            o.id = id;
            if (tsv.lines[i][cSkillDesc])
                o.s = tsv.lines[i][cSkill];
            if (skillDescs[skillDesc])
                o.n = skillDescs[skillDesc];
            if (tsv.lines[i][cCharclass])
                o.c = tsv.lines[i][cCharclass];
            arr[id] = o;
        }
    }
    return arr;
}
function _readRareNames(tsv, idx, strings) {
    var arr = [];
    var cName = tsv.header.indexOf("name");
    var id = idx;
    for (var i = 1; i < tsv.lines.length; i++) {
        var name_1 = tsv.lines[i][cName];
        if (name_1) {
            arr[id - idx] = {
                id: id,
                n: strings[name_1],
            };
            id++;
        }
    }
    return arr;
}
function _readMagicNames(tsv, strings) {
    var arr = [];
    var cName = tsv.header.indexOf("Name");
    var cTransformcolor = tsv.header.indexOf("transformcolor");
    var id = 1;
    for (var i = 1; i < tsv.lines.length; i++) {
        var name_2 = tsv.lines[i][cName];
        if (name_2 != "Expansion") {
            var o = {};
            o.id = id;
            o.n = strings[name_2];
            if (tsv.lines[i][cTransformcolor])
                o.tc = tsv.lines[i][cTransformcolor];
            arr[id] = o;
            id++;
        }
    }
    return arr;
}
function _readProperties(tsv, strings) {
    var arr = {};
    var cCode = tsv.header.indexOf("code");
    var cStats = [];
    for (var j = 1; j <= 7; j++) {
        cStats[j] = {};
        cStats[j].cStat = tsv.header.indexOf("stat" + j);
        cStats[j].cFunc = tsv.header.indexOf("func" + j);
        cStats[j].cVal = tsv.header.indexOf("val" + j);
    }
    for (var i = 1; i < tsv.lines.length; i++) {
        var propId = tsv.lines[i][cCode];
        if (propId != "Expansion") {
            var stats = [];
            //prop.code = code;
            for (var j = 1; j <= 7; j++) {
                var stat = void 0;
                var type = void 0;
                var func = tsv.lines[i][cStats[j].cFunc];
                stat = tsv.lines[i][cStats[j].cStat];
                type = propertyTypeFromFunc(func);
                var val = tsv.lines[i][cStats[j].cVal];
                if (!stat && !func) {
                    break;
                }
                switch (func) {
                    case "5": {
                        stat = "mindamage";
                        type = "other";
                        break;
                    }
                    case "6": {
                        stat = "maxdamage";
                        type = "other";
                        break;
                    }
                    // case "": {
                    //   stat = "item_mindamage_percent";
                    //   type = "other";
                    //   break;
                    // }
                    case "7": {
                        stat = "item_maxdamage_percent";
                        type = "all";
                        break;
                    }
                    case "20": {
                        stat = "item_indesctructible";
                        type = "other";
                        break;
                    }
                    // case "23": {
                    //   stat = "ethereal"
                    //   break;
                    // }
                    default: {
                        break;
                    }
                }
                var s = {};
                if (stat)
                    s.s = stat;
                if (type)
                    s.type = type;
                if (func)
                    s.f = +func;
                if (val)
                    s.val = +val;
                stats[j - 1] = s;
            }
            arr[propId] = stats;
        }
    }
    return arr;
}
function propertyTypeFromFunc(func) {
    switch (func) {
        case "11":
            return "proc";
        case "19":
            return "charges";
        case "3":
            return "all";
        case "15":
            return "min";
        case "16":
            return "max";
        case "17":
            return "param";
        default:
            return "other";
    }
}
function _readRunewords(tsv, strings, skills) {
    var _a;
    var arr = [];
    var cName = tsv.header.indexOf("Name");
    var cComplete = tsv.header.indexOf("complete");
    var types = [];
    for (var i = 1; i < 7; i++) {
        types.push(tsv.header.indexOf("itype" + i));
    }
    var runes = [];
    for (var i = 1; i < 7; i++) {
        runes.push(tsv.header.indexOf("Rune" + i));
    }
    var modifiers = [];
    for (var i = 1; i < 12; i++) {
        modifiers[i] = [];
        modifiers[i].cMod = tsv.header.indexOf("T1Code" + i);
        modifiers[i].cParam = tsv.header.indexOf("T1Param" + i);
        modifiers[i].cMin = tsv.header.indexOf("T1Min" + i);
        modifiers[i].cMax = tsv.header.indexOf("T1Max" + i);
    }
    var _loop_1 = function (i) {
        var name_3 = tsv.lines[i][cName];
        var enabled = tsv.lines[i][cComplete];
        var o = {};
        if (enabled) {
            var id = +name_3.substring(8);
            //TODO: why?
            if (id > 75) {
                id += 25;
            }
            else {
                id += 26;
            }
            o.id = id;
            o.n = strings[tsv.lines[i][cName]];
            var t = [];
            for (var j = 0; j <= 6; j++) {
                var type = tsv.lines[i][types[j]];
                if (!type) {
                    break;
                }
                t[j] = type;
            }
            o.types = t;
            var r = [];
            for (var j = 0; j <= 6; j++) {
                var rune = tsv.lines[i][runes[j]];
                if (!rune) {
                    break;
                }
                r[j] = rune;
            }
            o.r = r;
            o.m = [];
            var s = skills.filter(function (s) { return s && s.s; });
            var _loop_2 = function (j) {
                var mod = tsv.lines[i][modifiers[j].cMod];
                if (!mod) {
                    return "break";
                }
                var m = {};
                m.prop = mod;
                var param = Number(+tsv.lines[i][modifiers[j].cParam]);
                //string value
                if (Number.isNaN(param)) {
                    param = (_a = s.find(function (s) { return s.s.trim().toLocaleLowerCase() == tsv.lines[i][modifiers[j].cParam].trim().toLocaleLowerCase(); })) === null || _a === void 0 ? void 0 : _a.id;
                }
                if (tsv.lines[i][modifiers[j].cParam])
                    m.p = param;
                if (tsv.lines[i][modifiers[j].cMin])
                    m.min = +tsv.lines[i][modifiers[j].cMin];
                if (tsv.lines[i][modifiers[j].cMax])
                    m.max = +tsv.lines[i][modifiers[j].cMax];
                o.m.push(m);
            };
            for (var j = 1; j < 12; j++) {
                var state_1 = _loop_2(j);
                if (state_1 === "break")
                    break;
            }
            arr[id] = o;
        }
    };
    for (var i = 1; i < tsv.lines.length; i++) {
        _loop_1(i);
    }
    return arr;
}
function _readTypes(tsv, strings) {
    var arr = {};
    var cCode = tsv.header.indexOf("Code");
    var cItemType = tsv.header.indexOf("ItemType");
    var cEquiv1 = tsv.header.indexOf("Equiv1");
    var cEquiv2 = tsv.header.indexOf("Equiv2");
    var cInvGfx = [];
    for (var i = 1; i <= 6; i++) {
        cInvGfx.push(tsv.header.indexOf("InvGfx" + i));
    }
    for (var i = 1; i < tsv.lines.length; i++) {
        var code = tsv.lines[i][cCode];
        if (code) {
            var o = {};
            var invgfx = [];
            for (var j = 0; j <= 6; j++) {
                if (tsv.lines[i][cInvGfx[j]])
                    invgfx[j] = tsv.lines[i][cInvGfx[j]];
            }
            o.ig = invgfx;
            o.eq1 = tsv.lines[i][cEquiv1];
            o.eq2 = tsv.lines[i][cEquiv2];
            o.n = tsv.lines[i][cItemType];
            o.c = [o.n];
            arr[code] = o;
        }
    }
    for (var _i = 0, _a = Object.keys(arr); _i < _a.length; _i++) {
        var k = _a[_i];
        arr[k].c = __spreadArrays(_resolvetItemTypeCategories(arr, k));
        if (arr[k] !== undefined && arr[arr[k].eq1] !== undefined) {
            arr[k].eq1n = arr[arr[k].eq1].n;
        }
        if (arr[k] !== undefined && arr[arr[k].eq2] !== undefined) {
            arr[k].eq2n = arr[arr[k].eq2].n;
        }
    }
    return arr;
}
function _resolvetItemTypeCategories(arr, key) {
    var res = [];
    if (arr[key] !== undefined) {
        res = __spreadArrays([arr[key].n], _resolvetItemTypeCategories(arr, arr[key].eq1), _resolvetItemTypeCategories(arr, arr[key].eq2));
    }
    return res;
}
function _readItems(tsv, itemtypes, strings) {
    var arr = [];
    var cCode = tsv.header.indexOf("code");
    var cNameStr = tsv.header.indexOf("namestr");
    var cStackable = tsv.header.indexOf("stackable");
    var cMinac = tsv.header.indexOf("minac");
    var cMaxac = tsv.header.indexOf("maxac");
    var cDurability = tsv.header.indexOf("durability");
    var cMindam = tsv.header.indexOf("mindam");
    var cMaxdam = tsv.header.indexOf("maxdam");
    var cTwoHandMindam = tsv.header.indexOf("2handmindam");
    var cTwoHandMaxdam = tsv.header.indexOf("2handmaxdam");
    var cMinmisdam = tsv.header.indexOf("minmisdam");
    var cMaxmisdam = tsv.header.indexOf("maxmisdam");
    var cReqstr = tsv.header.indexOf("reqstr");
    var cReqdex = tsv.header.indexOf("reqdex");
    var cHasinv = tsv.header.indexOf("hasinv");
    var cGemapplytype = tsv.header.indexOf("gemapplytype");
    var cInvfile = tsv.header.indexOf("invfile");
    var cUniqueInvfile = tsv.header.indexOf("uniqueinvfile");
    var cSetInvfile = tsv.header.indexOf("setinvfile");
    var cInvwidth = tsv.header.indexOf("invwidth");
    var cInvheight = tsv.header.indexOf("invheight");
    var cInvtransform = tsv.header.indexOf("InvTrans");
    var cType = tsv.header.indexOf("type");
    var cNormCode = tsv.header.indexOf("normcode");
    var cUberCode = tsv.header.indexOf("ubercode");
    var cUltraCode = tsv.header.indexOf("ultracode");
    var cGemSockets = tsv.header.indexOf("gemsockets");
    var cSpawnable = tsv.header.indexOf("spawnable");
    var cOneOrTwoHadned = tsv.header.indexOf("1or2handed");
    var cTwoHanded = tsv.header.indexOf("2handed");
    var cNodurability = tsv.header.indexOf("nodurability");
    for (var i = 1; i < tsv.lines.length; i++) {
        var code = tsv.lines[i][cCode];
        if (code) {
            var item = {};
            item.code = code;
            item.nc = tsv.lines[i][cNormCode];
            item.exc = tsv.lines[i][cUberCode];
            item.elc = tsv.lines[i][cUltraCode];
            item.iq =
                item.code === item.exc
                    ? types.EItemQuality.exceptional
                    : item.code === item.elc
                        ? types.EItemQuality.elite
                        : types.EItemQuality.normal;
            item.n = strings[tsv.lines[i][cNameStr]];
            if (tsv.lines[i][cStackable] && +tsv.lines[i][cStackable] > 0)
                item.s = 1;
            if (tsv.lines[i][cMinac] && +tsv.lines[i][cMinac] > 0)
                item.minac = +tsv.lines[i][cMinac];
            if (tsv.lines[i][cMaxac] && +tsv.lines[i][cMaxac] > 0)
                item.maxac = +tsv.lines[i][cMaxac];
            if (tsv.lines[i][cDurability])
                item.durability = +tsv.lines[i][cDurability];
            if (tsv.lines[i][cMindam] && +tsv.lines[i][cMindam] > 0)
                item.mind = +tsv.lines[i][cMindam];
            if (tsv.lines[i][cMaxdam] && +tsv.lines[i][cMaxdam] > 0)
                item.maxd = +tsv.lines[i][cMaxdam];
            if (tsv.lines[i][cTwoHandMindam] && +tsv.lines[i][cTwoHandMindam] > 0)
                item.min2d = +tsv.lines[i][cTwoHandMindam];
            if (tsv.lines[i][cTwoHandMaxdam] && +tsv.lines[i][cTwoHandMaxdam] > 0)
                item.max2d = +tsv.lines[i][cTwoHandMaxdam];
            if (tsv.lines[i][cMinmisdam] && +tsv.lines[i][cMinmisdam] > 0)
                item.minmd = +tsv.lines[i][cMinmisdam];
            if (tsv.lines[i][cMaxmisdam] && +tsv.lines[i][cMaxmisdam] > 0)
                item.maxmd = +tsv.lines[i][cMaxmisdam];
            if (tsv.lines[i][cReqstr])
                item.rs = +tsv.lines[i][cReqstr];
            if (tsv.lines[i][cReqdex])
                item.rd = +tsv.lines[i][cReqdex];
            if (tsv.lines[i][cHasinv])
                item.hi = +tsv.lines[i][cHasinv];
            if (tsv.lines[i][cGemapplytype])
                item.gt = +tsv.lines[i][cGemapplytype];
            if (tsv.lines[i][cInvfile])
                item.i = tsv.lines[i][cInvfile];
            if (tsv.lines[i][cUniqueInvfile])
                item.ui = tsv.lines[i][cUniqueInvfile];
            if (tsv.lines[i][cSetInvfile])
                item.si = tsv.lines[i][cSetInvfile];
            if (tsv.lines[i][cInvwidth])
                item.iw = +tsv.lines[i][cInvwidth];
            if (tsv.lines[i][cInvheight])
                item.ih = +tsv.lines[i][cInvheight];
            if (tsv.lines[i][cInvtransform])
                item.it = +tsv.lines[i][cInvtransform];
            if (tsv.lines[i][cType])
                item.type = tsv.lines[i][cType];
            if (tsv.lines[i][cGemSockets]) {
                item.gemsockets = +tsv.lines[i][cGemSockets];
            }
            else {
                item.gemsockets = 0;
            }
            if (tsv.lines[i][cSpawnable])
                item.spawnable = +tsv.lines[i][cSpawnable];
            if (tsv.lines[i][cOneOrTwoHadned])
                item.handed1or2 = +tsv.lines[i][cOneOrTwoHadned];
            if (tsv.lines[i][cTwoHanded])
                item.handed2 = +tsv.lines[i][cTwoHanded];
            if (tsv.lines[i][cNodurability])
                item.nodurability = +tsv.lines[i][cNodurability];
            var type = itemtypes[tsv.lines[i][cType]];
            if (type && type.ig) {
                item.ig = type.ig;
                item.eq1n = type.eq1n;
                item.eq2n = type.eq2n;
                item.c = type.c;
            }
            arr.push(item);
        }
    }
    return arr;
}
function _readGems(miscItems, tsv, strings) {
    var cCode = tsv.header.indexOf("code");
    var types = ["weapon", "helm", "shield"];
    var cols = {};
    for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
        var type = types_1[_i];
        cols[type] = [];
        for (var j = 1; j <= 3; j++) {
            cols[type][j] = {};
            cols[type][j].cMod = tsv.header.indexOf(type + "Mod" + j + "Code");
            cols[type][j].cParam = tsv.header.indexOf(type + "Mod" + j + "Param");
            cols[type][j].cMin = tsv.header.indexOf(type + "Mod" + j + "Min");
            cols[type][j].cMax = tsv.header.indexOf(type + "Mod" + j + "Max");
        }
    }
    for (var i = 1; i < tsv.lines.length; i++) {
        var code = tsv.lines[i][cCode];
        if (code && code != "Expansion") {
            var item = miscItems[code];
            // const row = {
            //   weapon: [],
            //   helm: [],
            //   shield: [],
            // };
            for (var k = 0; k < 3; k++) {
                var type = types[k];
                //const m = {} as any;
                for (var j = 1; j <= 3; j++) {
                    var mod = tsv.lines[i][cols[type][j].cMod];
                    if (!mod) {
                        break;
                    }
                    if (j == 1) {
                        if (!item.m)
                            item.m = [];
                        item.m[k] = [];
                    }
                    var m = {};
                    m.prop = mod;
                    if (tsv.lines[i][cols[type][j].cParam])
                        m.p = +tsv.lines[i][cols[type][j].cParam];
                    if (tsv.lines[i][cols[type][j].cMin])
                        m.min = +tsv.lines[i][cols[type][j].cMin];
                    if (tsv.lines[i][cols[type][j].cMax])
                        m.max = +tsv.lines[i][cols[type][j].cMax];
                    item.m[k].push(m);
                }
                //row[type].push(m);
            }
            //item.m = row;
        }
    }
}
function _readSetOrUnqItems(tsv, strings, skills) {
    var _a;
    var arr = [];
    var cIndex = tsv.header.indexOf("index");
    var cInvfile = tsv.header.indexOf("invfile");
    var cCode = tsv.header.indexOf("code");
    if (cCode < 0)
        cCode = tsv.header.indexOf("item");
    var cInvtransform = tsv.header.indexOf("invtransform");
    var cLvl = tsv.header.indexOf("lvl");
    var modifiers = [];
    for (var i = 1; i < 12; i++) {
        modifiers[i] = [];
        modifiers[i].cMod = tsv.header.indexOf("prop" + i);
        modifiers[i].cParam = tsv.header.indexOf("par" + i);
        modifiers[i].cMin = tsv.header.indexOf("min" + i);
        modifiers[i].cMax = tsv.header.indexOf("max" + i);
    }
    var id = 0;
    var _loop_3 = function (i) {
        var index = tsv.lines[i][cIndex];
        if (index && index != "Expansion") {
            var o = {};
            o.id = id;
            o.n = strings[tsv.lines[i][cIndex]];
            if (tsv.lines[i][cInvfile])
                o.i = tsv.lines[i][cInvfile];
            if (tsv.lines[i][cCode])
                o.c = tsv.lines[i][cCode];
            if (tsv.lines[i][cInvtransform])
                o.tc = tsv.lines[i][cInvtransform];
            if (tsv.lines[i][cLvl])
                o.lvl = tsv.lines[i][cLvl];
            o.m = [];
            var _loop_4 = function (j) {
                var mod = tsv.lines[i][modifiers[j].cMod];
                if (!mod) {
                    return "break";
                }
                var m = {};
                m.prop = mod;
                var param = Number(+tsv.lines[i][modifiers[j].cParam]);
                if (Number.isNaN(param)) {
                    param = (_a = skills.filter(function (s) { return s && s.s; }).find(function (s) { return s.s == tsv.lines[i][modifiers[j].cParam]; })) === null || _a === void 0 ? void 0 : _a.id;
                }
                if (tsv.lines[i][modifiers[j].cParam])
                    m.p = param;
                if (tsv.lines[i][modifiers[j].cMin])
                    m.min = +tsv.lines[i][modifiers[j].cMin];
                if (tsv.lines[i][modifiers[j].cMax])
                    m.max = +tsv.lines[i][modifiers[j].cMax];
                o.m.push(m);
            };
            for (var j = 1; j < 12; j++) {
                var state_2 = _loop_4(j);
                if (state_2 === "break")
                    break;
            }
            arr[id] = o;
            id++;
        }
    };
    for (var i = 1; i < tsv.lines.length; i++) {
        _loop_3(i);
    }
    return arr;
}
function _readItemStatCosts(tsv, strings) {
    var arr = [];
    var cStat = tsv.header.indexOf("Stat");
    var cId = tsv.header.indexOf("ID");
    if (cId < 0) {
        cId = tsv.header.indexOf("*ID");
    }
    var cCSvBits = tsv.header.indexOf("CSvBits");
    var cCSvParam = tsv.header.indexOf("CSvParam");
    var cCSvSigned = tsv.header.indexOf("CSvSigned");
    var cEncode = tsv.header.indexOf("Encode");
    var cValShift = tsv.header.indexOf("ValShift");
    var cSigned = tsv.header.indexOf("Signed");
    var cSaveBits = tsv.header.indexOf("Save Bits");
    var cSaveAdd = tsv.header.indexOf("Save Add");
    var cSaveParamBits = tsv.header.indexOf("Save Param Bits");
    var cDescPriority = tsv.header.indexOf("descpriority");
    var cDescFunc = tsv.header.indexOf("descfunc");
    var cDescVal = tsv.header.indexOf("descval");
    var cDescstrpos = tsv.header.indexOf("descstrpos");
    var cDescstrneg = tsv.header.indexOf("descstrneg");
    var cDescstr2 = tsv.header.indexOf("descstr2");
    var cDgrp = tsv.header.indexOf("dgrp");
    var cDgrpFunc = tsv.header.indexOf("dgrpfunc");
    var cDgrpVal = tsv.header.indexOf("dgrpval");
    var cDgrpstrpos = tsv.header.indexOf("dgrpstrpos");
    var cDgrpstrneg = tsv.header.indexOf("dgrpstrneg");
    var cDgrpstr2 = tsv.header.indexOf("dgrpstr2");
    var cOp = tsv.header.indexOf("op");
    var cOpParam = tsv.header.indexOf("op param");
    var cOpBase = tsv.header.indexOf("op base");
    var cOpStat1 = tsv.header.indexOf("op stat1");
    var cOpStat2 = tsv.header.indexOf("op stat2");
    var cOpStat3 = tsv.header.indexOf("op stat3");
    var id = 0;
    for (var i = 1; i < tsv.lines.length; i++) {
        //const id = +tsv.lines[i][cId];
        var stat = tsv.lines[i][cStat];
        if (stat) {
            var o = {};
            o.id = id;
            o.s = stat;
            if (tsv.lines[i][cCSvBits])
                o.cB = +tsv.lines[i][cCSvBits];
            if (tsv.lines[i][cCSvParam])
                o.cP = +tsv.lines[i][cCSvParam];
            if (tsv.lines[i][cCSvSigned])
                o.cS = +tsv.lines[i][cCSvSigned];
            if (tsv.lines[i][cEncode])
                o.e = +tsv.lines[i][cEncode];
            if (tsv.lines[i][cValShift])
                o.vS = +tsv.lines[i][cValShift];
            if (tsv.lines[i][cSigned])
                o.sS = +tsv.lines[i][cSigned];
            if (tsv.lines[i][cSaveBits])
                o.sB = +tsv.lines[i][cSaveBits];
            if (tsv.lines[i][cSaveAdd])
                o.sA = +tsv.lines[i][cSaveAdd];
            if (tsv.lines[i][cSaveParamBits])
                o.sP = +tsv.lines[i][cSaveParamBits];
            if (tsv.lines[i][cDescPriority])
                o.so = +tsv.lines[i][cDescPriority];
            if (tsv.lines[i][cDescFunc])
                o.dF = +tsv.lines[i][cDescFunc];
            if (tsv.lines[i][cDescVal])
                o.dV = +tsv.lines[i][cDescVal];
            if (tsv.lines[i][cDescstrpos])
                o.dP = strings[tsv.lines[i][cDescstrpos]];
            if (tsv.lines[i][cDescstrneg])
                o.dN = strings[tsv.lines[i][cDescstrneg]];
            if (tsv.lines[i][cDescstr2])
                o.d2 = strings[tsv.lines[i][cDescstr2]];
            if (tsv.lines[i][cDgrp])
                o.dg = +tsv.lines[i][cDgrp];
            if (tsv.lines[i][cDgrpFunc])
                o.dgF = +tsv.lines[i][cDgrpFunc];
            if (tsv.lines[i][cDgrpVal])
                o.dgV = +tsv.lines[i][cDgrpVal];
            if (tsv.lines[i][cDgrpstrpos])
                o.dgP = strings[tsv.lines[i][cDgrpstrpos]];
            if (tsv.lines[i][cDgrpstrneg])
                o.dN = strings[tsv.lines[i][cDgrpstrneg]];
            if (tsv.lines[i][cDgrpstr2])
                o.dg2 = strings[tsv.lines[i][cDgrpstr2]];
            if (tsv.lines[i][cOp])
                o.o = +tsv.lines[i][cOp];
            if (tsv.lines[i][cOpParam])
                o.op = +tsv.lines[i][cOpParam];
            if (tsv.lines[i][cOpBase])
                o.ob = tsv.lines[i][cOpBase];
            if (tsv.lines[i][cOpStat1])
                o.os = [tsv.lines[i][cOpStat1]];
            if (tsv.lines[i][cOpStat2])
                o.os[1] = tsv.lines[i][cOpStat2];
            if (tsv.lines[i][cOpStat3])
                o.os[2] = tsv.lines[i][cOpStat3];
            var dmgstatrange = item_property_stat_count[stat];
            if (dmgstatrange) {
                o.np = dmgstatrange.numprops;
                o.dR = strings[dmgstatrange.rangestr];
                o.dE = strings[dmgstatrange.equalstr];
            }
            arr[id] = o;
            id++;
        }
    }
    return arr;
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./d2/d2s */ "./src/d2/d2s.ts"), exports);
var header_1 = __webpack_require__(/*! ./d2/header */ "./src/d2/header.ts");
Object.defineProperty(exports, "readHeader", { enumerable: true, get: function () { return header_1.readHeader; } });
Object.defineProperty(exports, "readHeaderData", { enumerable: true, get: function () { return header_1.readHeaderData; } });
Object.defineProperty(exports, "writeHeader", { enumerable: true, get: function () { return header_1.writeHeader; } });
Object.defineProperty(exports, "writeHeaderData", { enumerable: true, get: function () { return header_1.writeHeaderData; } });
Object.defineProperty(exports, "fixHeader", { enumerable: true, get: function () { return header_1.fixHeader; } });
var attributes_1 = __webpack_require__(/*! ./d2/attributes */ "./src/d2/attributes.ts");
Object.defineProperty(exports, "readAttributes", { enumerable: true, get: function () { return attributes_1.readAttributes; } });
Object.defineProperty(exports, "writeAttributes", { enumerable: true, get: function () { return attributes_1.writeAttributes; } });
var skills_1 = __webpack_require__(/*! ./d2/skills */ "./src/d2/skills.ts");
Object.defineProperty(exports, "readSkills", { enumerable: true, get: function () { return skills_1.readSkills; } });
Object.defineProperty(exports, "writeSkills", { enumerable: true, get: function () { return skills_1.writeSkills; } });
var attribute_enhancer_1 = __webpack_require__(/*! ./d2/attribute_enhancer */ "./src/d2/attribute_enhancer.ts");
Object.defineProperty(exports, "enhanceAttributes", { enumerable: true, get: function () { return attribute_enhancer_1.enhanceAttributes; } });
Object.defineProperty(exports, "enhanceItems", { enumerable: true, get: function () { return attribute_enhancer_1.enhanceItems; } });
Object.defineProperty(exports, "enhancePlayerAttributes", { enumerable: true, get: function () { return attribute_enhancer_1.enhancePlayerAttributes; } });
Object.defineProperty(exports, "generateFixedMods", { enumerable: true, get: function () { return attribute_enhancer_1.generateFixedMods; } });
var constants_1 = __webpack_require__(/*! ./d2/constants */ "./src/d2/constants.ts");
Object.defineProperty(exports, "getConstantData", { enumerable: true, get: function () { return constants_1.getConstantData; } });
Object.defineProperty(exports, "setConstantData", { enumerable: true, get: function () { return constants_1.setConstantData; } });
__exportStar(__webpack_require__(/*! ./data/parser */ "./src/data/parser.ts"), exports);
exports.types = __importStar(__webpack_require__(/*! ./d2/types */ "./src/d2/types.ts"));
var stash_1 = __webpack_require__(/*! ./d2/stash */ "./src/d2/stash.ts");
Object.defineProperty(exports, "readStash", { enumerable: true, get: function () { return stash_1.readStash; } });
Object.defineProperty(exports, "writeStash", { enumerable: true, get: function () { return stash_1.writeStash; } });


/***/ })

/******/ });
//# sourceMappingURL=d2s.bundle.js.map