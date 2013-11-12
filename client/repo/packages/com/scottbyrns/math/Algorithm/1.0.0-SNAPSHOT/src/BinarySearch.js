com.scottbyrns.math.Algorithm.BinarySearch = function (first, last, x) {
	
	while (first != last) {
		var middle = first + (last - first) / 2;
		if (middle < x) {
			first = middle + 1;
		}
		else
		{
			last = middle;
		}
	}
	
	return first;
	
};
