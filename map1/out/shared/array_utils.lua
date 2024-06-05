-- Compiled with roblox-ts v2.3.0
math.randomseed(os.time())
local function shuffleArray(array)
	do
		local i = #array - 1
		local _shouldIncrement = false
		while true do
			if _shouldIncrement then
				i -= 1
			else
				_shouldIncrement = true
			end
			if not (i > 0) then
				break
			end
			local j = math.floor(math.random() * (i + 1))
			local _index = i + 1
			local _index_1 = j + 1
			array[_index], array[_index_1] = array[j + 1], array[i + 1]
		end
	end
	return array
end
return {
	shuffleArray = shuffleArray,
}
