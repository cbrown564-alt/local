#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "../lib/public-slugs.mjs";
const builtPath = path.join(projectRoot, "dist", "concepts", "kd-hair", "index.html");
if (!existsSync(builtPath)) { console.error("Missing build"); process.exit(1); }
const html = readFileSync(builtPath, "utf8");
const text = html.replace(/<script[\s\S]*?<\/script>/gi," ").replace(/<style[\s\S]*?<\/style>/gi," ").replace(/<!--[\s\S]*?-->/g," ").replace(/<[^>]+>/g," ").replace(/\s+/g," ");
const failures=[]; const check=(l,c)=>{ if(!c) failures.push(l); };
check("door", text.includes("16 Mourne Rise") && text.includes("BT33 0HE"));
check("phone", text.includes("07549 958 060") || html.includes("tel:+447549958060"));
check("handoff", /kdhair16\.co\.uk/.test(html));
check("hero", html.includes("kd-hair-hero-mourne-rise.jpg"));
check("no form", !/<form/i.test(html));
check("not deja vu door", !text.includes("33 Central Promenade"));
if (failures.length) { console.error("FAIL", failures); process.exit(1); }
console.log("test-kd-hair-elevation: OK");
