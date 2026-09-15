#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";
const builtPath = path.join(projectRoot, "dist", "concepts", "joke-and-toy-shop", "index.html");
if (!existsSync(builtPath)) { console.error("Missing build"); process.exit(1); }
const html = readFileSync(builtPath, "utf8");
const text = html.replace(/<script[\s\S]*?<\/script>/gi," ").replace(/<style[\s\S]*?<\/style>/gi," ").replace(/<!--[\s\S]*?-->/g," ").replace(/<[^>]+>/g," ").replace(/\s+/g," ");
const failures=[]; const check=(l,c)=>{ if(!c) failures.push(l); };
check("door", text.includes("43 Central Promenade") && text.includes("BT33 0DJ"));
check("phone", text.includes("028 4372 4147") || html.includes("tel:+442843724147"));
check("handoff", /thejokeandtoyshop\.com/.test(html));
check("hero", html.includes("joke-and-toy-shop-hero-promenade.jpg"));
check("no form", !/<form/i.test(html));
if (failures.length) { console.error("FAIL", failures); process.exit(1); }
console.log("test-joke-and-toy-shop-elevation: OK");
