#!/usr/bin/ruby

require 'rubygems'
require 'nokogiri'
require 'base64'

icount = 0 
xmlfeed = Nokogiri::XML(open("../partial.xml"))
#puts xmlfeed
#all_items = xmlfeed.xpath("//update-log-entry")
all_items = xmlfeed.xpath("//journal-entry")
	all_items.each do |adv|
		puts "\n\n"
		puts icount
		if (adv.children.filter("title").first.child != nil)
		puts "Title: " + adv.children.filter("title").first.child.inner_text
		end
		if (adv.children.filter("url-id").first.child != nil)
		puts "URL ID: " + adv.children.filter("url-id").first.child.inner_text
		end
		#if (adv.children.filter("description").first.child != nil)
		#	puts "Description: " + adv.children.filter("description").first.child.inner_text
		#end
		if (adv.children.filter("body").first.child != nil)
			plain = Base64.decode64(adv.children.filter("body").first.child.inner_text)
			#puts "Body: " + adv.children.filter("body").first.child.inner_text
			puts "Body: " + plain
		end
		if (adv.children.filter("added-on").first.child != nil)
		puts "Date: " + adv.children.filter("added-on").first.child.inner_text
		end
		#puts adv
		icount = icount + 1
	end
