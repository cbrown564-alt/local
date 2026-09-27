#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";
const builtPath = path.join(projectRoot, "dist", "concepts", "great-jones", "index.html");
if (!existsSync(builtPath)) { console.error("Missing build"); process.exit(1); }
const html = readFileSync(builtPath, "utf8");
const text = html.replace(/<script[\s\S]*?<\/script>/gi," ").replace(/<style[\s\S]*?<\/style>/gi," ").replace(/<!--[\s\S]*?-->/g," ").replace(/<[^>]+>/g," ").replace(/\s+/g," ");
const failures=[]; const check=(l,c)=>{ if(!c) failures.push(l); };
check("door", text.includes("73 Main Street") && text.includes("BT33 0AE"));
check("phone", text.includes("028 4379 8275") || html.includes("tel:+442843798275"));
check("handoff", /greatjones\.co\.uk/.test(html));
check("hero", html.includes("great-jones-hero-main-street.jpg"));
check("no form", !/<form/i.test(html));
check("not bucks head booking", !/resdiary|opentable/i.test(html));
if (failures.length) { console.error("FAIL", failures); process.exit(1); }
console.log("test-great-jones-elevation: OK");
