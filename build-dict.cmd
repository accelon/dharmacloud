ptk listwords dc.off zhwiki-20230701-pages-articles-multistream-index.txt
ren dc.off-listwords.csv dc-wikipedia.csv
ptk listwords dc.off fgdcd-entries.txt
ren dc.off-listwords.csv dc-fgdzd.csv
ptk listwords dc.off dfb-entries.txt
rename dc.off-listwords.csv dc-dfb.csv
node gen-dictentry.js