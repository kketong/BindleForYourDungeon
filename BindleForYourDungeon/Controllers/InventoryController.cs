using BindleForYourDungeon.Models.Items;
using BindleForYourDungeon.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace BindleForYourDungeon.Controllers
{
	[ApiController]
	[Route("items")]
	public class ItemController(
		ILogger<ItemController> logger,
		IItemRepository itemRepository) : ControllerBase
	{
		private readonly ILogger<ItemController> _logger = logger;
		private readonly IItemRepository itemRepository = itemRepository ?? throw new ArgumentNullException(nameof(itemRepository));

		[HttpGet]
		public async Task<ActionResult<IList<Item>>> GetItems()
		{
			var items = await itemRepository.GetAllItemsAsync();

			return Ok(items);
		}

		[HttpGet("{itemId}")]
		public async Task<ActionResult<Item>> GetItem(Guid itemId)
		{
			var item = await itemRepository.GetItemByIdAsync(itemId);

			return Ok(item);
		}

		[HttpPost]
		public async Task<ActionResult> AddItem(Item item)
		{
			await itemRepository.AddItemAsync(item);

			return Created(Url.Content("~/") + item.Id, item);
		}

		[HttpPatch()]
		public async Task<ActionResult<Item>> EditItem(Item item)
		{
			await itemRepository.EditItemAsync(item);

			return Ok(item);
		}

		[HttpDelete()]
		public async Task<ActionResult> DeleteAsync(Item item)
		{
			if (item.Id == default)
			{
				var errorMessage = "Delete item failed: invalid ID.";
				_logger.LogWarning(errorMessage);
				return BadRequest(errorMessage);
			}

			await itemRepository.DeleteItemAsync(item);

			return NoContent();
		}
	}
}