cmd/c ptk dump dc dc.off
cmd/c ptk listwords dc.off zhwiki-20230701-pages-articles-multistream-index.txt
copy/Y dc.off-listwords.csv dc-wikipedia.csv
cmd/c ptk listwords dc.off fgdcd-entries.txt
copy/Y dc.off-listwords.csv dc-fgdzd.csv
cmd/c ptk listwords dc.off dfb-entries.txt
copy/Y dc.off-listwords.csv dc-dfb.csv
node gen-dictentry.js