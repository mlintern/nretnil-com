#!/usr/bin/ruby

require 'rubygems'
require 'nokogiri'

icount = 0 
xmlfeed = Nokogiri::XML(open("../parker-part.xml"))
#puts xmlfeed
all_items = xmlfeed.xpath("//update-log-entry")
	all_items.each do |adv|
		puts "Title: " + adv.children.filter("title").first.child.inner_text
		puts "Description: " + adv.children.filter("description").first.child.inner_text
		puts "Date: " + adv.children.filter("added-on").first.child.inner_text
		puts adv
		icount = icount + 1
	end
puts icount
