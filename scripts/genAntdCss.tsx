// scripts/genAntdCss.tsx
import fs from 'fs';
import { extractStyle } from '@ant-design/static-style-extract';
import { ConfigProvider, theme } from "antd";

const outputPath = './public/antd.min.css';

const css = extractStyle();

fs.writeFileSync(outputPath, css);
