// import axios from "axios";
import fetchJsonp from "fetch-jsonp";


/**
 * 一言
 */

// 获取一言数据
export const getHitokoto = async () => {
  const res = await fetch("https://v1.hitokoto.cn");
  return await res.json();
};


/**
 * 获取配置
 */

// 获取社交链接
export const getSocialLinks = async () => {
  const res = await fetch("/socialLinks.json");
  return await res.json();
};
