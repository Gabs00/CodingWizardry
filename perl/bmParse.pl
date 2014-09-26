    #!/usr/bin/perl

    use strict;
    use warnings;
    use autodie;
    use HTML::Tree;

    my ($bmFile, $search) = @ARGV;
    if(!$bmFile && !$search){
      print "USAGE: <program> <path/to/file> <query>\n";
      die;
    }

    my $tree = HTML::TreeBuilder->new_from_file($bmFile);
    my @elems = $tree->look_down(
        _tag => 'a', 
        sub { 
          $_[0]->as_text() =~ /$search/i;
        }
      );

    print $_->as_text() . "\n" . $_->attr('href') . "\n\n" for @elems;