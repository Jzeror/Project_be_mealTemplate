package com.bemeal.web.item;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.bemeal.web.cmm.CommonMapper;
import com.bemeal.web.cmm.Pagination;
import com.bemeal.web.img.Image;
import com.bemeal.web.tx.TxService;


@RestController
public class ItemCtrl {
	private static final Logger logger = LoggerFactory.getLogger(ItemCtrl.class);
	@Autowired Item item;
	@Autowired Image img;
	@Autowired ItemMapper itemMapper;
	@Autowired CommonMapper cmmMapper;
	@Autowired Pagination pagi;
	@Autowired TxService tx;
	@Autowired HashMap<String,Object> map;
	
	
	@GetMapping("/item/list/{brand}/{category}/{sort}")//   /{}
	public @ResponseBody HashMap<String,Object> list(
			@PathVariable String brand,
			@PathVariable String category,
			@PathVariable String sort
			){
		map.clear();
		if(brand.equals("브랜드전체") && category.equals("카테고리전체")) {
			item.setBrand(null);
			item.setCategory(null);	
		}else if(brand.equals("브랜드전체")) {
			item.setBrand(null);
			item.setCategory(category);
		}else if(category.equals("카테고리전체")) {
			item.setCategory(null);
			item.setBrand(brand);
		}else {
			item.setBrand(brand);
			item.setCategory(category);
		}
		
		if(sort.equals("가격")) {
			map.put("listsm", itemMapper.listSomePrice(item));
		}else if(sort.equals("칼로리")){
			map.put("listsm", itemMapper.listSomeCalorie(item));
		}/*else {
			map.put("listsm", itemMapper.listSomeScore(item));
		}*///그냥평점으로하면 한 아이템당 여러 아이디가 평가한 평점들을 나열하기 때문에  평균평점으로 sort해야함
		logger.info("itemMapper:map.get(\"listsm\"):{}",map.get("listsm"));
		return map;
	}
	@GetMapping("/item/pagi/{count}/{pageNum}")// /{pageNum}/{pageSize}/{blockSize}
	public @ResponseBody HashMap<String, Object> pagination(
			@PathVariable int count,
			@PathVariable String pageNum
			){
		//logger.info("count:{}",count);
		map.clear();
		map.put("pageNum",pageNum);
		map.put("count", count);
		map.put("pageSize", 6);
		map.put("blockSize", 1);
		//logger.info("map::{}",map);
		pagi.excute(map);
		map.put("pagi", pagi);
		
		
		logger.info("map.get(\"pagi\"):{}",map.get("pagi"));
		return map;
	}
	@GetMapping("/item/retrieve/{itemSeq}")
	public @ResponseBody HashMap<String, Object> retrieve(@PathVariable String itemSeq ){
		map.clear();
		//logger.info("itemseq int:{}",Integer.parseInt(itemSeq));
		item.setItemSeq(Integer.parseInt(itemSeq));
//		logger.info("itemseq :{}",item);
		itemMapper.retrieve(item);
		itemMapper.tag(item);
		logger.info("item retrieve:{}",itemMapper.retrieve(item));
//		logger.info("itemMapper.tag(item):{}",itemMapper.tag(item));
		map.put("retrieve", itemMapper.retrieve(item));
		map.put("rtag", itemMapper.tag(item));
//		logger.info("rtag::{}",map.get("rtag").toString());
		return map;
	}
	@GetMapping("/item/recommend/{memberId}/{itemSeq}")
	public @ResponseBody HashMap<String, Object> recommend(
			@PathVariable String memberId,
			@PathVariable String itemSeq
			){
		logger.info("/item/relative/::{}",memberId);
		logger.info("/item/relative/::{}",itemSeq);
		return map;
	}
}
