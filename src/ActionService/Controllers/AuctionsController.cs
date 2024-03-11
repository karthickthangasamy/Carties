﻿using ActionService.Data;
using ActionService.DTOs;
using ActionService.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ActionService.Controllers
{
    [ApiController]
    [Route("api/auctions")]
    public class AuctionsController : ControllerBase
    {
        private readonly AuctionDbContext _context;
        private readonly IMapper _mapper;
        public AuctionsController(AuctionDbContext context, IMapper mapper)
        {

            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<AuctionDto>>> GetAllAuctions()
        {
            var auctions = await _context.Auctions
                    .Include(x => x.Item)
                    .OrderBy(x => x.Item.Make)
                    .ToListAsync();

            return _mapper.Map<List<AuctionDto>>(auctions);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AuctionDto>> GetAuctionById(Guid id)
        {
            var aution = await _context.Auctions
                    .Include(x => x.Item)
                    .FirstOrDefaultAsync(x => x.Id == id);

            if (aution == null)
            {
                return NotFound();
            }

            return _mapper.Map<AuctionDto>(aution);
        }

        [HttpPost]

        public async Task<ActionResult<AuctionDto>> CreateAuction(CreateAuctionDto createAuctionDto)
        {
            var auction = _mapper.Map<Auction>(createAuctionDto);

            //TODO: add current user as seller
            auction.Seller = "test";

            _context.Auctions.Add(auction);
            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return BadRequest("Couldn't save changes into DB");

            return CreatedAtAction(nameof(GetAuctionById), new { auction.Id }, _mapper.Map<AuctionDto>(auction));
        }

        [HttpPut("{id}")]

        public async Task<ActionResult> UpdateAuction(Guid id, UpdateAuctionDto updateAuctionDto)
        {
            var auction = await _context.Auctions.Include(x => x.Item)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (auction == null) return NotFound();

            //TODO: check seller == username

            auction.Item.Make = updateAuctionDto.Make ?? auction.Item.Make;
            auction.Item.Model = updateAuctionDto.Model ?? auction.Item.Model;
            auction.Item.Color = updateAuctionDto.Color ?? auction.Item.Color;
            auction.Item.Mileage = updateAuctionDto.Mileage ?? auction.Item.Mileage;
            auction.Item.Year = updateAuctionDto.Year ?? auction.Item.Year;

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest("ID not found or bad request");

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAuction(Guid id)
        {
            var auction = await _context.Auctions.FindAsync(id);

            if (auction == null) return NotFound();

            _context.Auctions.Remove(auction);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();
            return BadRequest("Could not update DB");
        }
    }
}
