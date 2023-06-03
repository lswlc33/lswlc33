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
 * 天气
 */

// 获取高德地理位置信息
export const getAdcode = async (key) => {
  const res = await fetch(`https://restapi.amap.com/v3/ip?key=${key}`);
  return await res.json();
};

// 获取高德地理天气信息
export const getWeather = async (key, city) => {
  const res = await fetch(
    `https://restapi.amap.com/v3/weather/weatherInfo?key=${key}&city=${city}`
  );
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
